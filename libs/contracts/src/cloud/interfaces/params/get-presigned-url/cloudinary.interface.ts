import { CLOUD_PROVIDER } from '../../../enums';

export interface CloudinaryGetPresignedUrlParams {
  provider: CLOUD_PROVIDER.Cloudinary;
  filePath: string;
  folder: string;
}
