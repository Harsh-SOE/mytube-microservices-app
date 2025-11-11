export interface StoragePort {
  getPresignedUrlForChannelCoverImage(
    channelCoverImageFileName: string,
    expiresIn?: number,
  ): Promise<string>;
}

export const STORAGE_PORT = Symbol('STORAGE_PORT');
