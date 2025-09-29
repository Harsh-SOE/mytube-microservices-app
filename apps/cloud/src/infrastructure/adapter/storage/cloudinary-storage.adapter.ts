import { FileChunk, UploadFileDto } from '@app/contracts/cloud';
import { UploadOptions } from '@cloud/application/options';
import { IStorage } from '@cloud/application/ports';
import { UploadResult } from '@cloud/application/response';
import { AppConfigService } from '@cloud/infrastructure/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CloudinaryStorageAdapter implements IStorage, OnModuleInit {
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
