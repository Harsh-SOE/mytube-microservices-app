import { CLOUD_PROVIDER } from '../../../enums';

export interface AwsGetPresignedUrlParams {
  provider: CLOUD_PROVIDER.AWS;
  key: string;
  Bucket: string;
  contentType: string;
}
