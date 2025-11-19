import { Inject } from '@nestjs/common';
import Ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs/promises';
import * as fsStream from 'fs';
import path from 'path';
import chokidar, { FSWatcher } from 'chokidar';

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
  private transcodedFileSegementsWatcher: FSWatcher;

  public constructor(
    @Inject(STORAGE_PORT) private readonly storageAdapter: StoragePort,
    @Inject(LOGGER_PORT) private readonly loggerAdapter: LoggerPort,
  ) {}

  public async transcodeVideo(
    transcodeVideoOptions: TranscodeVideoOptions,
  ): Promise<void> {
    const { fileIdentifier, videoId } = transcodeVideoOptions;

    const videoFileToTranscode =
      await this.storageAdapter.getRawVideoFileAsReadableStream(fileIdentifier);

    const outputDir = path.join(this.transcodedVideoDir, videoId);
    const manifestPath = path.join(outputDir, `${videoId}.m3u8`);
    const segmentPattern = path.join(outputDir, 'segment%03d.ts');

    await fs.mkdir(outputDir, { recursive: true });

    // --- NEW: Concurrency controlled upload queue ---
    const maxConcurrent = 3;
    let running = 0;
    const queue: (() => Promise<void>)[] = [];

    const runNext = () => {
      if (running >= maxConcurrent) return;
      const job = queue.shift();
      if (!job) return;

      running++;
      job()
        .finally(() => {
          running--;
          runNext();
        })
        .catch((error: Error) => {
          this.loggerAdapter.error(
            `An Error occured while uploading a file segment`,
            error,
          );
        });
    };

    const enqueueUpload = (fn: () => Promise<void>) => {
      queue.push(fn);
      runNext();
    };

    // --- NEW: Chokidar watcher for segments ---
    this.transcodedFileSegementsWatcher = chokidar.watch(
      path.join(this.transcodedVideoDir, videoId, '*.ts'),
      {
        ignoreInitial: true,
        awaitWriteFinish: {
          stabilityThreshold: 250,
          pollInterval: 100,
        },
      },
    );

    this.transcodedFileSegementsWatcher.on('add', (filePath) => {
      enqueueUpload(async () => {
        const fileName = path.basename(filePath);
        const fileStream = fsStream.createReadStream(filePath);

        this.loggerAdapter.info(`Uploading segment: ${fileName}`);

        await this.storageAdapter.uploadTranscodedVideoFileAsStream(
          fileStream,
          videoId,
          fileName,
        );

        this.loggerAdapter.info(`Segment uploaded: ${fileName}`);
        this.loggerAdapter.info(`Deleting segment: ${fileName}`);

        await fs.unlink(filePath);

        this.loggerAdapter.info(`Segment deleted: ${fileName}`);
      });
    });

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

    await new Promise<void>((resolve) => {
      const check = () => {
        if (queue.length === 0 && running === 0) resolve();
        else setTimeout(check, 500);
      };
      check();
    });

    await this.transcodedFileSegementsWatcher.close();

    await this.storageAdapter.uploadTranscodedVideoFileAsStream(
      fsStream.createReadStream(manifestPath),
      videoId,
      `${videoId}.m3u8`,
    );

    this.loggerAdapter.info(`Manifest uploaded`);

    await fs.rm(outputDir, { recursive: true, force: true });
  }
}
