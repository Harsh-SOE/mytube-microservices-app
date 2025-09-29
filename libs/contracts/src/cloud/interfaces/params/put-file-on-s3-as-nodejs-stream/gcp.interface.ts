import { Readable } from 'stream';
import { CLOUD_PROVIDER } from '../../../enums';

export interface GcpPutFileOnS3AsNodeJsStreamParam {
  provider: CLOUD_PROVIDER.GCP;
  fileStream: Readable;
  key: string;
  Bucket: string;
}
