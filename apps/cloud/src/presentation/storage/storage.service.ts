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
import { StoragePort } from '@cloud/application/ports';

@Injectable()
export class StorageService implements OnModuleInit {
  private storage: StoragePort;

  public constructor(
    private readonly cloudStorage: StorageAdapter,
    @Inject(WINSTON_LOGGER)
    private readonly logger: Logger,
  ) {}

  onModuleInit() {
    this.storage = this.cloudStorage.getProvider();
  }

  /**
   * Generates a pre-signed URL for accessing a file in cloud storage.
   *
   * @param {GetPresignedUrlDto} cloudPresignedUrlDto - Data transfer object containing the directory information for which the pre-signed URL is to be generated.
   * @returns A promise that resolves to an object containing the generated pre-signed URL.
   */
  public async generatePreSignedUrl(
    cloudPresignedUrlDto: GetPresignedUrlDto,
  ): Promise<CloudPreSignedUrlResponse> {
    const result = await this.storage.getPresignedUrl(
      cloudPresignedUrlDto.dir,
      300,
    );
    return { url: result };
  }

  /**
   * Downloads a file from cloud storage as a Node.js readable stream and emits its chunks as an Observable of `FileChunk`.
   *
   * Each emitted `FileChunk` contains the chunk data, its size, and a flag indicating if it is the last chunk.
   * The observable completes after emitting the last chunk.
   *
   * @param {DownloadFileAsStreamDto} getFileAsNodeJSReadableStreamObservableDto - Data transfer object containing the file path key to download.
   * @returns An Observable that emits `FileChunk` objects representing the file's data chunks.
   */
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

  /**
   * Uploads a file to cloud storage.
   *
   * @param {Observable<UploadFileDto>} uploadFileDto - An observable emitting the file data to be uploaded, encapsulated in an `UploadFileDto`.
   * @returns A promise that resolves to an object indicating the result of the upload operation.
   * @remarks
   * - Supports multipart uploads with configurable concurrency and part size.
   * - Allows upload abortion via an external abort signal.
   * - Emits progress logs during upload.
   */
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
