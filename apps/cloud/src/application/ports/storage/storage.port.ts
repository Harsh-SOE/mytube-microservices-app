import { Observable } from 'rxjs';

import { FileChunk, UploadFileDto } from '@app/contracts/cloud';

import { UploadResult } from '@cloud/application/response';
import { UploadOptions } from '@cloud/application/options';

export interface StoragePort {
  getPresignedUrl(filePathKey: string, expiresIn?: number): Promise<string>;

  /**
   * Downloads a file from cloud storage as a node.js readable stream
   * @param {string} filePathKey - The key of the file to download
   * @returns {Observable<FileChunk>} - An observable that emits the file chunks as they are downloaded
   */
  downloadFileAsNodeJsReadableStream(
    filePathKey: string,
  ): Observable<FileChunk>;

  /**
   * Uploads a file to cloud storage
   * @param {Observable<UploadFileDto>} uploadFileToCloud - An observable that emits the file chunks to upload
   * @param {UploadOptions} [options] - Options for the upload
   * @returns {Promise<UploadResult>} - A promise that resolves with the result of the upload
   */
  uploadFile(
    uploadFileToCloud: Observable<UploadFileDto>,
    options?: UploadOptions,
  ): Promise<UploadResult>;
}
