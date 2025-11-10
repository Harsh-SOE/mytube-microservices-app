export interface StoragePort {
  getPresignedUrl(filePathKey: string, expiresIn?: number): Promise<string>;
}

export const STORAGE_PORT = Symbol('STORAGE_PORT');
