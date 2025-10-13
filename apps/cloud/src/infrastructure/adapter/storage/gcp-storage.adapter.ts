import { Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';

import { FileChunk, UploadFileDto } from '@app/contracts/cloud';

import { UploadOptions } from '@cloud/application/options';
import { StoragePort } from '@cloud/application/ports';
import { UploadResult } from '@cloud/application/response';
import { AppConfigService } from '@cloud/infrastructure/config';

@Injectable()
export class GCPStorageAdapter implements StoragePort, OnModuleInit {
  constructor(private configService: AppConfigService) {}

  onModuleInit() {}

  getPresignedUrl(filePathKey: string, expiresIn?: number): Promise<string> {
    throw new Error('Method not implemented.');
  }

  downloadFileAsNodeJsReadableStream(
    filePathKey: string,
  ): Observable<FileChunk> {
    throw new Error('Method not implemented.');
  }

  uploadFile(
    uploadFileToCloud: Observable<UploadFileDto>,
    options: UploadOptions,
  ): Promise<UploadResult> {
    throw new Error('Method not implemented.');
  }
}
