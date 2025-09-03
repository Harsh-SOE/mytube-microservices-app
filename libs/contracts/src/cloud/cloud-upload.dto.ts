import { AwsUploadParams } from './interfaces';
import { CloudinaryUploadParams } from './interfaces';
import { GCPUploadParams } from './interfaces';

// discriminated union
export type UploadToCloudDto =
  | AwsUploadParams
  | CloudinaryUploadParams
  | GCPUploadParams;
