import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from 'winston';

import {
  CloudPreSignedUrlResponse,
  DownloadFileAsStreamDto,
  FileChunk,
  GetPresignedUrlDto,
  StreamFileToCloudResponse,
  UploadFileDto,
} from '@app/contracts/cloud';
import { WINSTON_LOGGER } from '@app/clients';

import { StorageAdapter } from '@cloud/infrastructure/adapter/storage';

import { IStorage } from '../ports';

@Injectable()
export class StorageService implements OnModuleInit {
  private storage: IStorage;

  public constructor(
    private readonly cloudStorage: StorageAdapter,
    @Inject(WINSTON_LOGGER)
    private readonly logger: Logger,
  ) {}

  onModuleInit() {
    this.storage = this.cloudStorage.getProvider();
  }

  public async generatePreSignedUrl(
    cloudPresignedUrlDto: GetPresignedUrlDto,
  ): Promise<CloudPreSignedUrlResponse> {
    const result = await this.storage.getPresignedUrl(
      cloudPresignedUrlDto.dir,
      300,
    );
    return { url: result };
  }

  public downloadFileAsStream(
    getFileAsNodeJSReadableStreamObservableDto: DownloadFileAsStreamDto,
  ): Observable<FileChunk> {
    this.logger.log(
      'info',
      `CLOUD::GET_FILE_AS_NODEJS_READABLE_STREAM:: Request recieved: ${JSON.stringify(getFileAsNodeJSReadableStreamObservableDto)}`,
    );

    console.log(`Fetching file as a stream....`);

    return this.storage.downloadFileAsNodeJsReadableStream(
      getFileAsNodeJSReadableStreamObservableDto.key,
    );
  }

  public async uploadFile(
    uploadFileDto: Observable<UploadFileDto>,
  ): Promise<StreamFileToCloudResponse> {
    await this.storage.uploadFile(uploadFileDto, {
      resumable: true,
      multipart: { partSizeBytes: 8 * 1024 * 1024, concurrency: 4 },
    });
    return { upload: true };
  }
}
