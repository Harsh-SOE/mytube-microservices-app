import { CLOUD_PROVIDER } from '../enums';

export interface GCPUploadParams {
  provider: CLOUD_PROVIDER.GCP;
  Bucket: string;
  name: string;
}
