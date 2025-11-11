export interface StoragePort {
  getPresignedUrlForUserAvatar(
    userAvatarFileName: string,
    expiresIn?: number,
  ): Promise<string>;
}

export const STORAGE_PORT = Symbol('STORAGE_PORT');
