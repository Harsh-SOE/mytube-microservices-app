export interface StoragePort {
  getPresignedUrlForChannelCoverImage(
    channelCoverImageFileName: string,
    expiresIn?: number,
  ): Promise<{ fileIdentifier: string; presignedUrl: string }>;
}

export const STORAGE_PORT = Symbol('STORAGE_PORT');
