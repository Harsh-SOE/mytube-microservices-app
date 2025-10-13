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

import { StoragePort } from '@cloud/application/ports';
import { UploadResult } from '@cloud/application/response';
import { UploadOptions } from '@cloud/application/options';
import { AppConfigService } from '@cloud/infrastructure/config';

import { FileChunk, UploadFileDto } from '@app/contracts/cloud';

@Injectable()
export class AwsS3StorageAdapter implements StoragePort, OnModuleInit {
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

  /**
   * Logs the lifecycle events (`next`, `error`, `complete`) of the provided Observable.
   * Useful for debugging and monitoring Observable emissions.
   *
   * @typeParam T - The type of items emitted by the Observable.
   * @param observable - The Observable to be logged.
   * @returns An Observable that logs its events to the console.
   */
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

  /**
   * Retrieves a file from AWS S3 as a readable stream.
   *
   * @param key - The key (path) of the file in the S3 bucket.
   * @returns A Promise that resolves to a readable stream of the file's contents.
   * @throws {RpcException} If the file stream is not found or invalid.
   */
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

  /**
   * Converts an Observable emitting `UploadFileDto` objects into a Node.js readable stream.
   *
   * This method subscribes to the provided Observable and writes each chunk's file data to a `PassThrough` stream.
   * It resolves with the readable stream and the file path key from the first emitted chunk.
   * The stream is ended when the last chunk is received or when the Observable completes.
   *
   * @param streamFileToCloudDto - Observable emitting `UploadFileDto` objects containing file data and metadata.
   * @returns A promise that resolves with an object containing the readable stream and the file path key.
   */
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

  /**
   * Generates a presigned URL for uploading a file to AWS S3.
   *
   * @param filePathKey - The key (path) of the file in the S3 bucket.
   * @param expiresIn - Optional expiration time (in seconds) for the presigned URL.
   * @returns A promise that resolves to the presigned URL string.
   */
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

  /**
   * Downloads a file from AWS S3 as a Node.js readable stream and emits its chunks as an Observable of `FileChunk`.
   *
   * Each emitted `FileChunk` contains the chunk data, its size, and a flag indicating if it is the last chunk.
   * The observable completes after emitting the last chunk.
   *
   * @param filePathKey - The S3 file path key to download.
   * @returns An Observable that emits `FileChunk` objects representing the file's data chunks.
   *
   * @remarks
   * - The observable will emit an empty buffer with `isLast: true` to signal the end of the stream.
   * - Any errors during streaming will be emitted as observable errors.
   * - Unsubscribing will clean up event listeners and destroy the underlying stream.
   */
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

  /**
   * Uploads a file stream to AWS S3 storage.
   *
   * @param streamFileToCloudDto - An observable emitting the file data to upload.
   * @param options - Optional upload configuration, including content type, multipart settings, and abort signal.
   * @returns A promise that resolves to an object containing the uploaded file's key.
   *
   * @remarks
   * - Converts the observable to a readable stream before uploading.
   * - Supports multipart uploads with configurable concurrency and part size.
   * - Allows upload abortion via an external abort signal.
   * - Emits progress logs during upload.
   */
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
