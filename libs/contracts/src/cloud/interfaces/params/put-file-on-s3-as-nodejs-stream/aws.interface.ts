import { Readable } from 'stream';
import { CLOUD_PROVIDER } from '../../../enums';

export interface AwsPutFileOnS3AsNodeJsStreamParam {
  provider: CLOUD_PROVIDER.AWS;
  fileStream: Readable;
  key: string;
  contentType: string;
}
