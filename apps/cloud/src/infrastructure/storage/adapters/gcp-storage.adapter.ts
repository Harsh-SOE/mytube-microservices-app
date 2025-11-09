import { Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';

import { FileChunk, UploadFileDto } from '@app/contracts/cloud';

import {
  StoragePort,
  UploadOptions,
  UploadResult,
} from '@cloud/application/ports';
import { AppConfigService } from '@cloud/infrastructure/config';

@Injectable()
export class GCPStorageAdapter implements StoragePort, OnModuleInit {
  constructor(private configService: AppConfigService) {}

  onModuleInit() {}

  getPresignedUrl(filePathKey: string, expiresIn?: number): Promise<string> {
    throw new Error('Method not implemented.');
  }

  downloadFileAsStream(filePathKey: string): Observable<FileChunk> {
    throw new Error('Method not implemented.');
  }

  uploadFileAsStream(
    uploadFileToCloud: Observable<UploadFileDto>,
    options: UploadOptions,
  ): Promise<UploadResult> {
    throw new Error('Method not implemented.');
  }
}
