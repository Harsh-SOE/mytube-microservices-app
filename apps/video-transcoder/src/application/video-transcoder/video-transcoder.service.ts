import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import * as fs from 'fs/promises';
import * as fsStream from 'fs';
import Ffmpeg from 'fluent-ffmpeg';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { PassThrough } from 'stream';
import path from 'path';
import winston from 'winston';

import {
  CLOUD_SERVICE_NAME,
  CloudServiceClient,
  FileChunk,
  UploadFileDto,
} from '@app/contracts/cloud';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients';
import { VideoTranscodeDto } from '@app/contracts/video-transcoder';

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

  private getContentType(fileName: string): string {
    if (fileName.endsWith('.m3u8')) {
      return 'application/vnd.apple.mpegurl';
    }
    if (fileName.endsWith('.ts')) {
      return 'video/mp2t';
    }
    return 'application/octet-stream';
  }

  private logObservable<T>(observable: Observable<T>, s3Key: string) {
    return observable.pipe(
      tap({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: (value) => {
          console.log(`[TAP] Observable for ${s3Key} emitted NEXT`);
        },
        error: (err) => {
          console.error(`[TAP] Observable for ${s3Key} emitted ERROR:`, err);
        },
        complete: () => {
          console.log(`[TAP] Observable for ${s3Key} emitted COMPLETE`);
        },
      }),
    );
  }

  private async createStreamForAllTranscodedFilesAndSendToCloudService(
    outputDir: string,
    videoId: string,
  ) {
    console.log(`Video was transcoded successfully...`);
    const files = await fs.readdir(outputDir);

    const uploadPromises = files.map((file) => {
      const filePath = path.join(outputDir, file);
      const s3Key = `hls/${videoId}/${file}`;

      const fileStreamObservable = new Observable<UploadFileDto>((observer) => {
        const fileStream = fsStream.createReadStream(filePath);
        const onData = (chunk: Buffer) => {
          observer.next({
            fileKey: s3Key,
            fileStream: {
              data: chunk,
              size: chunk.length,
              isLast: false,
            },
          });
        };

        const onError = (error: Error) => {
          observer.error(error);
        };

        const onEnd = () => {
          Logger.log(`File: ${s3Key} stream was ended`);
          observer.next({
            fileKey: s3Key,
            fileStream: {
              data: Buffer.alloc(0),
              size: 0,
              isLast: true,
            },
          });
          observer.complete();
          console.log(`Completed Triggered`);
        };

        fileStream.on('data', onData);
        fileStream.on('error', onError);
        fileStream.on('end', onEnd);
        return () => {
          fileStream.off('data', onData);
          fileStream.off('error', onError);
          fileStream.off('end', onEnd);
          fileStream.destroy();
        };
      });

      const loggedObservable = this.logObservable<UploadFileDto>(
        fileStreamObservable,
        s3Key,
      );

      return lastValueFrom(this.cloudService.uploadFile(loggedObservable));
    });

    await Promise.all(uploadPromises);
    await fs.rm(outputDir, { recursive: true, force: true });
  }

  async transcodeVideo(videoTranscodeDto: VideoTranscodeDto) {
    this.logger.log(
      'info',
      `VIDEO_TRANSCODER::TRANSCODE_VIDEO:: Request recieved: ${JSON.stringify(videoTranscodeDto)}`,
    );

    const { key, videoId } = videoTranscodeDto;

    const outputDir = path.join('/home/node/transcoded-videos', videoId);
    const manifestPath = path.join(outputDir, `${videoId}.m3u8`);
    const segmentPattern = path.join(outputDir, 'segment%03d.ts');

    await fs.mkdir(outputDir, { recursive: true });
    let isVideotranscoded = false;

    await new Promise((resolve, reject) => {
      const readableFileStream$: Observable<FileChunk> =
        this.cloudService.downloadFileAsStream({ key });

      const inputStream = new PassThrough();

      console.log(`transcoded files will be saved to ${outputDir}`);
      let isFirstChunk = true;

      readableFileStream$.subscribe({
        next: (chunk) => {
          inputStream.write(chunk.data);
          if (isFirstChunk) {
            Ffmpeg(inputStream)
              .videoCodec('libx264')
              .outputOptions(['-preset ultrafast', '-b:v 4M', '-threads 0'])
              .audioCodec('aac')
              .outputOption('-f', 'hls')
              .outputOption('-hls_time', '6')
              .outputOption('-hls_playlist_type', 'vod')
              .outputOption('-hls_segment_filename', segmentPattern)
              .on('error', (err, stdout, stderr) => {
                console.error(`FFmpeg error for video:${videoId}:`, err);
                console.error('ffmpeg stderr:\n' + stderr);
                reject(err);
              })
              .on('end', () => {
                console.log(
                  `HLS transcoding for ${videoId} finished successfully.`,
                );
                isVideotranscoded = true;
                resolve(outputDir);
              })
              .on('progress', (progress) => {
                console.log('Processing: ' + progress.timemark);
              })
              .save(manifestPath);
            isFirstChunk = false;
          }
        },
        error: (error: Error) => {
          console.log(`An error occured while streaming the file`, error);
          inputStream.end();
          reject(error);
        },
        complete: () => {
          Logger.log(`Video transcoding completed successfully`);
          inputStream.end();
        },
      });
    });
    if (isVideotranscoded) {
      return this.createStreamForAllTranscodedFilesAndSendToCloudService(
        outputDir,
        videoId,
      );
    }
  }
}
