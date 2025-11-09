import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  CloudPreSignedUrlResponse,
  DownloadFileAsStreamDto,
  FileChunk,
  GetPresignedUrlDto,
  StreamFileToCloudResponse,
  UploadFileDto,
} from '@app/contracts/cloud';

import {
  LOGGER_PORT,
  LoggerPort,
  STORAGE_PORT,
  StoragePort,
} from '@cloud/application/ports';

@Injectable()
export class GrpcService {
  private storage: StoragePort;

  public constructor(
    @Inject(STORAGE_PORT) private readonly cloudStorage: StoragePort,
    @Inject(LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

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
    this.logger.info(`Fetching file as a stream....`);

    return this.storage.downloadFileAsStream(
      getFileAsNodeJSReadableStreamObservableDto.key,
    );
  }

  public async uploadFile(
    uploadFileDto: Observable<UploadFileDto>,
  ): Promise<StreamFileToCloudResponse> {
    await this.storage.uploadFileAsStream(uploadFileDto, {
      resumable: true,
      multipart: { partSizeBytes: 8 * 1024 * 1024, concurrency: 4 },
    });
    return { upload: true };
  }
}
