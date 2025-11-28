import { Inject } from '@nestjs/common';
import Ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs/promises';
import path from 'path';

import {
  TranscoderPort,
  TranscodeVideoOptions,
  STORAGE_PORT,
  StoragePort,
  LOGGER_PORT,
  LoggerPort,
} from '@transcoder/application/ports';

export class FFmpegVideoTranscoderUploaderAdapter implements TranscoderPort {
  private readonly transcodedVideoDir = '/@streamforge/transcoded-videos';

  public constructor(
    @Inject(STORAGE_PORT) private readonly storageAdapter: StoragePort,
    @Inject(LOGGER_PORT) private readonly loggerAdapter: LoggerPort,
  ) {}

  public async transcodeVideo(
    transcodeVideoOptions: TranscodeVideoOptions,
  ): Promise<void> {
    const { fileIdentifier, videoId } = transcodeVideoOptions;
    this.loggerAdapter.alert(`Transcoding video now: ${fileIdentifier}`);

    const videoFileToTranscode =
      await this.storageAdapter.getRawVideoFileAsReadableStream(fileIdentifier);

    const outputDir = path.join(this.transcodedVideoDir, videoId);
    const manifestPath = path.join(outputDir, `${videoId}.m3u8`);
    const segmentPattern = path.join(outputDir, 'segment%03d.ts');

    await fs.mkdir(outputDir, { recursive: true });

    await new Promise<void>((resolve, reject) => {
      Ffmpeg(videoFileToTranscode)
        .videoCodec('libx264')
        .outputOptions(['-preset ultrafast', '-b:v 4M', '-threads 0'])
        .audioCodec('aac')
        .outputOption('-f', 'hls')
        .outputOption('-hls_time', '6')
        .outputOption('-hls_playlist_type', 'vod')
        .outputOption('-hls_segment_filename', segmentPattern)
        .on('error', (err, _, stderr) => {
          this.loggerAdapter.error(`FFmpeg error for video:${videoId}`, err);
          this.loggerAdapter.error(`ffmpeg stderr: ${stderr}`);
          reject(err);
        })
        .on('end', () => {
          this.loggerAdapter.info(
            `HLS transcoding for ${videoId} finished successfully.`,
          );
          resolve();
        })
        .on('progress', (progress) => {
          this.loggerAdapter.info(`Processing: ${progress.timemark}`);
        })
        .save(manifestPath);
    });
  }
}
