import { Readable } from 'stream';

import { UploadResult, UploadOptions } from './types';

export interface StoragePort {
  getRawVideoFileAsReadableStream(fileIdentifier: string): Promise<Readable>;

  getTranscodedFileIdentifier(videoId: string): string;

  uploadTranscodedVideoFileAsStream(
    fileStream: Readable,
    videoId: string,
    videoFileName: string,
    options?: UploadOptions,
  ): Promise<UploadResult>;
}

export const STORAGE_PORT = Symbol('STORAGE_PORT');
