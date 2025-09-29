import { UploadResult } from '@cloud/application/response';
import { FileChunk, UploadFileDto } from '@app/contracts/cloud';
import { Observable } from 'rxjs';
import { UploadOptions } from '@cloud/application/options';

export interface IStorage {
  getPresignedUrl(filePathKey: string, expiresIn?: number): Promise<string>;

  downloadFileAsNodeJsReadableStream(
    filePathKey: string,
  ): Observable<FileChunk>;

  uploadFile(
    uploadFileToCloud: Observable<UploadFileDto>,
    options?: UploadOptions,
  ): Promise<UploadResult>;
}
