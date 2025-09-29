import { CLOUD_PROVIDER } from '../../../enums';

export interface GCPGetPreSignedUrlParams {
  provider: CLOUD_PROVIDER.GCP;
  Bucket: string;
  name: string;
}
