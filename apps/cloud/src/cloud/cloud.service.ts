import { Inject, Injectable } from '@nestjs/common';
import { from, mergeMap, Observable } from 'rxjs';

import {
  CloudPresignedUrlDto,
  CloudPreSignedUrlResponse,
  FileChunk,
  GetFileAsNodeJSReadableStreamObservableDto,
} from '@app/contracts/cloud';

import { CloudProviderService } from '../services/cloud-provider-service';
import { CloudParamsFactory } from '../factory/cloud-params.factory';
import { WINSTON_LOGGER } from '@app/clients';
import winston from 'winston';

@Injectable()
export class CloudService {
  constructor(
    @Inject('CLOUD_UPLOAD_PARAMS') private readonly factory: CloudParamsFactory,
    @Inject('CLOUD_STRATEGY')
    private readonly cloudProvider: CloudProviderService<any>,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
  ) {}

  generatePreSignedUrl(
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

  getFileAsNodeJSReadableStreamForGrpc(
    getFileAsNodeJSReadableStreamObservableDto: GetFileAsNodeJSReadableStreamObservableDto,
  ): Observable<FileChunk> {
    this.logger.log(
      'info',
      `CLOUD::GET_FILE_AS_NODEJS_READABLE_STREAM:: Request recieved: ${JSON.stringify(getFileAsNodeJSReadableStreamObservableDto)}`,
    );

    // return an observable so that nestJS can transport the file over the transport layer (Grpc)
    /*
    return new Observable<FileChunk>((observer) => {
      void (async () => {
        const fileAsNodeJSReadableStream =
          await this.cloudProvider.getFileAsNodeJSReadableStream(key);
        fileAsNodeJSReadableStream.on('data', (chunk: Buffer) => {
          observer.next({ data: chunk, size: chunk.length, isLast: false });
        });

        fileAsNodeJSReadableStream.on('end', () => {
          observer.next({ data: Buffer.alloc(0), size: 0, isLast: true });
          observer.complete();
        });

        fileAsNodeJSReadableStream.on('error', (error) => {
          observer.error(error);
        });
      })();
    });
    */

    return from(
      this.cloudProvider.getFileAsNodeJSReadableStream(
        getFileAsNodeJSReadableStreamObservableDto.key,
      ),
    ).pipe(
      mergeMap((fileAsNodeJSReadableStream) => {
        return new Observable<FileChunk>((observer) => {
          fileAsNodeJSReadableStream.on('data', (chunk: Buffer) => {
            observer.next({ data: chunk, size: chunk.length, isLast: false });
          });

          fileAsNodeJSReadableStream.on('end', () => {
            observer.next({ data: Buffer.alloc(0), size: 0, isLast: true });
            observer.complete();
          });

          fileAsNodeJSReadableStream.on('error', (error) => {
            observer.error(error);
          });
          // INFO: Cleanup when unsubscribing, else meomory leak will happen...
        });
      }),
    );
  }
}
