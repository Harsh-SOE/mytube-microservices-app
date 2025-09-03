import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import * as fs from 'fs';
import Ffmpeg from 'fluent-ffmpeg';

import {
  CLOUD_SERVICE_NAME,
  CloudServiceClient,
  FileChunk,
} from '@app/contracts/cloud';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients';
import { VideoTranscodeDto } from '@app/contracts/video-transcoder';

import { Observable } from 'rxjs';
import { PassThrough } from 'stream';
import path from 'path';
import winston from 'winston';

@Injectable()
export class VideoTranscoderService implements OnModuleInit {
  private cloudService: CloudServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.CLOUD) private readonly cloudClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
  ) {}

  onModuleInit() {
    this.cloudService = this.cloudClient.getService(CLOUD_SERVICE_NAME);
  }

  transcodeVideo(videoTranscodeDto: VideoTranscodeDto) {
    this.logger.log(
      'info',
      `VIDEO_TRANSCODER::TRANSCODE_VIDEO:: Request recieved: ${JSON.stringify(videoTranscodeDto)}`,
    );

    console.log(videoTranscodeDto);
    return new Promise((resolve, reject) => {
      const { key, videoId } = videoTranscodeDto;
      const readableFileStream$: Observable<FileChunk> =
        this.cloudService.getFileAsNodeJsReadableStreamObservable({ key });

      const inputStream = new PassThrough();

      const outputDir = path.join('/usr/src/transcoded-videos', videoId);
      const manifestPath = path.join(outputDir, `playlist-${videoId}.m3u8`);
      fs.mkdirSync(outputDir, { recursive: true });

      console.log(`transcoded files will be saved to ${outputDir}`);
      Ffmpeg(inputStream);
      Ffmpeg(inputStream)
        // 1. DECODE on CPU (This is the default, so no input options are needed)

        // 2. ENCODE on CPU
        .videoCodec('libx264') // Standard high-quality software H.264 encoder
        .outputOptions([
          '-preset fast', // A good balance between encoding speed and quality.
          // Other options: ultrafast, superfast, veryfast, medium, slow.
          '-b:v 4M', // Target video bitrate of 4 Mbps.
        ])

        // 3. Set AUDIO and HLS options
        .audioCodec('aac')
        .outputOption('-f', 'hls')
        .outputOption('-hls_time', '6')
        .outputOption('-hls_playlist_type', 'vod')
        .outputOption(
          '-hls_segment_filename',
          path.join(outputDir, 'segment%03d.ts'),
        )
        .on('error', (err, stdout, stderr) => {
          console.error(`FFmpeg error for video:${videoId}:`, err);
          console.error('ffmpeg stderr:\n' + stderr);
          reject(err);
        })
        .on('end', () => {
          console.log(`HLS transcoding for ${videoId} finished successfully.`);
          resolve(outputDir);
        })
        .on('progress', (progress) => {
          console.log('Processing: ' + progress.timemark);
        })
        .save(manifestPath);

      readableFileStream$.subscribe({
        next: (chunk) => {
          inputStream.write(chunk.data);
        },
        error: (error: Error) => {
          console.log(`An error occured while streaming the file`, error);
          console.error(
            'An error occurred while streaming the original file',
            error,
          );
          inputStream.end();
          reject(error);
        },
        complete: () => {
          console.log(`Video transcoding completed successfully`);
          inputStream.end();
        },
      });
    });
  }
}
