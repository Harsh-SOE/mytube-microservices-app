import { RpcException } from '@nestjs/microservices';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { from, mergeMap, Observable, tap } from 'rxjs';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { PassThrough, Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { IStorage } from '@cloud/application/ports';
import { UploadResult } from '@cloud/application/response';
import { UploadOptions } from '@cloud/application/options';
import { AppConfigService } from '@cloud/infrastructure/config';

import { FileChunk, UploadFileDto } from '@app/contracts/cloud';

@Injectable()
export class AwsS3StorageAdapter implements IStorage, OnModuleInit {
  private s3Client: S3Client;

  constructor(private configService: AppConfigService) {}

  onModuleInit() {
    this.s3Client = new S3Client({
      region: this.configService.AWS_REGION,
      credentials: {
        accessKeyId: this.configService.AWS_ACCESS_KEY,
        secretAccessKey: this.configService.AWS_ACCESS_SECRET,
      },
    });
  }

  private logObservable<T>(observable: Observable<T>) {
    return observable.pipe(
      tap({
        next: () => {
          console.log(`[TAP] Observable emitted NEXT`);
        },
        error: (err) => {
          console.error(`[TAP] Observable emitted ERROR:`, err);
        },
        complete: () => {
          console.log(`[TAP] Observable emitted COMPLETE`);
        },
      }),
    );
  }

  private async getFileFromS3(key: string) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.configService.AWS_BUCKET,
      Key: key,
    });
    const data = await this.s3Client.send(getObjectCommand);

    if (!data || !data.Body) {
      throw new RpcException('File stream not found or invalid.');
    }
    const stream = data.Body as Readable;
    return stream;
  }

  private ConvertObservableToReadableStream(
    streamFileToCloudDto: Observable<UploadFileDto>,
  ): Promise<{ stream: Readable; filePathKey: string }> {
    const stream = new PassThrough();

    return new Promise<{ stream: Readable; filePathKey: string }>(
      (resolve, reject) => {
        let resolved = false;

        streamFileToCloudDto.subscribe({
          next: (chunk: UploadFileDto) => {
            if (!resolved) {
              resolved = true;
              resolve({ stream, filePathKey: chunk.fileKey });
            }

            stream.write(chunk.fileStream?.data);

            if (chunk.fileStream?.isLast) {
              stream.end();
            }
          },
          error: (err: Error) => {
            stream.destroy(err);
            reject(err);
          },
          complete: () => {
            stream.end();
          },
        });
      },
    );
  }

  async getPresignedUrl(
    filePathKey: string,
    expiresIn?: number,
  ): Promise<string> {
    const putObjectCommand = new PutObjectCommand({
      Key: filePathKey,
      Bucket: this.configService.AWS_BUCKET,
    });

    return await getSignedUrl(this.s3Client, putObjectCommand, { expiresIn });
  }

  public downloadFileAsNodeJsReadableStream(
    filePathKey: string,
  ): Observable<FileChunk> {
    return from(this.getFileFromS3(filePathKey)).pipe(
      mergeMap((fileStream) => {
        return new Observable<FileChunk>((observer) => {
          const onData = (chunk: Buffer) => {
            observer.next({ data: chunk, size: chunk.length, isLast: false });
          };

          const onEnd = () => {
            observer.next({ data: Buffer.alloc(0), size: 0, isLast: true });
            observer.complete();
          };

          const onError = (error: Error) => {
            observer.error(error);
          };

          fileStream.on('data', onData);
          fileStream.on('end', onEnd);
          fileStream.on('error', onError);

          return () => {
            fileStream.off('data', onData);
            fileStream.off('end', onEnd);
            fileStream.off('error', onError);

            fileStream.destroy();
          };
        });
      }),
    );
  }

  public async uploadFile(
    streamFileToCloudDto: Observable<UploadFileDto>,
    options?: UploadOptions,
  ): Promise<UploadResult> {
    console.log(`Beginning to Upload`);

    const { filePathKey, stream } =
      await this.ConvertObservableToReadableStream(streamFileToCloudDto);

    console.log(`Stream is:`, stream);
    console.log(`Uploading to ${filePathKey}`);

    stream.on('data', () => {
      console.log(`Data recieved from stream`);
    });

    stream.on('end', () => {
      console.log(`Stream ends`);
    });

    const uploader = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.configService.AWS_BUCKET,
        Key: filePathKey,
        Body: stream,
        ContentType: options?.contentType,
      },
      queueSize: options?.multipart?.concurrency,
      partSize: options?.multipart?.partSizeBytes,
      leavePartsOnError: !!options?.resumable,
    });

    uploader.on('httpUploadProgress', (progress) => {
      console.log(`Uploaded: ${progress.loaded}/${progress.total} bytes`);
    });

    const aborter = options?.abortSignal;
    if (aborter) {
      aborter.addEventListener('abort', () => {
        uploader
          .abort()
          .then(() => console.log('Upload aborted cleanly.'))
          .catch((err) => console.error('Error while aborting:', err));
      });
    }
    await uploader.done();

    return { key: filePathKey };
  }
}
