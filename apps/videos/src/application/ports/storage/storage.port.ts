import Stream, { Readable } from 'stream';
import { UploadResult } from './types';
import { UploadOptions } from './types';

export interface StoragePort {
  getPresignedUrl(filePathKey: string, expiresIn?: number): Promise<string>;

  uploadFileAsStream(
    fileStream: Readable,
    key: string,
    options?: UploadOptions,
  ): Promise<UploadResult>;

  downloadFileAsStream(filePathKey: string): Stream | Promise<Readable>;
}
