import { CLOUD_PROVIDER } from '../enums';

export interface AwsUploadParams {
  provider: CLOUD_PROVIDER.AWS;
  key: string;
  Bucket: string;
  contentType: string;
}
