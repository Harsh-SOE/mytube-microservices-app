import { CLOUD_PROVIDER } from '../../../enums';

export interface AwsGetFileAsNodeJsStreamParam {
  provider: CLOUD_PROVIDER.AWS;
  key: string;
  bucket: string;
}
