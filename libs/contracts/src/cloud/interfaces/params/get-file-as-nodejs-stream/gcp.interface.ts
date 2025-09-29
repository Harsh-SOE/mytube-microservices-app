import { CLOUD_PROVIDER } from '../../../enums';

export interface GcpGetFileAsNodeJsStreamParam {
  provider: CLOUD_PROVIDER.GCP;
  key: string;
  Bucket: string;
}
