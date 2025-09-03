import { CLOUD_PROVIDER } from '../enums';

export interface CloudinaryUploadParams {
  provider: CLOUD_PROVIDER.Cloudinary;
  filePath: string;
  folder: string;
  buffer: Buffer;
}
