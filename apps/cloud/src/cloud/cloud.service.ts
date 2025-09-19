import { Inject, Injectable, Logger } from '@nestjs/common';
import { from, mergeMap, Observable, tap } from 'rxjs';
import winston from 'winston';
import { PassThrough } from 'stream';

import {
  CloudPresignedUrlDto,
  CloudPreSignedUrlResponse,
  FileChunk,
  GetFileAsNodeJSReadableStreamObservableDto,
  StreamFileToCloudDto,
  StreamFileToCloudResponse,
} from '@app/contracts/cloud';
import { WINSTON_LOGGER } from '@app/clients';

import { CloudProviderService } from '../services/cloud-provider-service';
import { CloudParamsFactory } from '../factory/cloud-params.factory';

@Injectable()
export class CloudService {
  public constructor(
    @Inject('CLOUD_UPLOAD_PARAMS') private readonly factory: CloudParamsFactory,
    @Inject('CLOUD_STRATEGY')
    private readonly cloudProvider: CloudProviderService<any>,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
  ) {}

  public generatePreSignedUrl(
    cloudPresignedUrlDto: CloudPresignedUrlDto,
  ): Promise<CloudPreSignedUrlResponse> {
    this.logger.log(
      'info',
      `CLOUD::GENERATE_PRESIGNED_URL:: Request recieved: ${JSON.stringify(cloudPresignedUrlDto)}`,
    );

    const dto =
      this.factory.getFileUploadParamsForSelectedStrategy(cloudPresignedUrlDto);
    return this.cloudProvider.getPreSignedUploadUrl(dto);
  }

  private logObservable<T>(observable: Observable<T>) {
    return observable.pipe(
      tap({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: (value) => {
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

  public getFileAsNodeJSReadableStreamForGrpc(
    getFileAsNodeJSReadableStreamObservableDto: GetFileAsNodeJSReadableStreamObservableDto,
  ): Observable<FileChunk> {
    this.logger.log(
      'info',
      `CLOUD::GET_FILE_AS_NODEJS_READABLE_STREAM:: Request recieved: ${JSON.stringify(getFileAsNodeJSReadableStreamObservableDto)}`,
    );

    return from(
      this.cloudProvider.getFileAsNodeJSReadableStream(
        getFileAsNodeJSReadableStreamObservableDto.key,
      ), // INFO: returns the Stream Object that will now open the stream in pause mode...
    ).pipe(
      // take the output from the function call and pipe to an Observable...
      mergeMap((fileAsNodeJSReadableStream) => {
        // create a new observable of FileChunk type
        const fileStreamObservable = new Observable<FileChunk>((observer) => {
          const onData = (chunk: Buffer) => {
            observer.next({ data: chunk, size: chunk.length, isLast: false }); // make it an observable's value and call next so that subscribers can actually get the FileChunk Observable data from the stream...
          };

          const onEnd = () => {
            observer.next({ data: Buffer.alloc(0), size: 0, isLast: true }); // make it an observable's value and call next so that subscribers can actually get the FileChunk Observable data from the stream...
            observer.complete(); // the observable completes here...
          };

          const onError = (error: Error) => {
            observer.error(error);
          };

          fileAsNodeJSReadableStream.on('data', onData); // INFO: attach a nodeJsReadableStream 'data' event to make stream flow...
          fileAsNodeJSReadableStream.on('end', onEnd);
          fileAsNodeJSReadableStream.on('error', onError);

          // INFO: Cleanup when unsubscribing, else meomory leak will happen...

          return () => {
            fileAsNodeJSReadableStream.off('data', onData);
            fileAsNodeJSReadableStream.off('end', onEnd);
            fileAsNodeJSReadableStream.off('error', onError);

            fileAsNodeJSReadableStream.destroy();
          };
        });
        return this.logObservable(fileStreamObservable);
      }),
    );
  }

  public streamFileToCloud(
    streamFileToCloudDto: Observable<StreamFileToCloudDto>,
  ): Promise<StreamFileToCloudResponse> {
    return new Promise<StreamFileToCloudResponse>((resolve, reject) => {
      let isFirst = true;
      let fileKey: string;
      let contentType: string;

      const inputStream = new PassThrough();

      this.logObservable(streamFileToCloudDto).subscribe({
        next: (streamFileDto: StreamFileToCloudDto) => {
          inputStream.write(streamFileDto.fileStream?.data);

          if (isFirst) {
            fileKey = streamFileDto.fileKey;
            contentType = streamFileDto.contentType;
            isFirst = false;

            this.cloudProvider
              .streamFileToCloud(fileKey, inputStream, contentType)
              .then(resolve)
              .catch(reject);
          }

          if (streamFileDto.fileStream?.isLast) {
            inputStream.end();
          }
        },
        error: (error: Error) => {
          console.error('An error occurred while streaming the file', error);
          inputStream.destroy(error);
          reject(error);
        },
        complete: () => {
          Logger.log(
            `Source observable for ${fileKey} completed successfully.`,
          );
        },
      });
    });
  }
}
