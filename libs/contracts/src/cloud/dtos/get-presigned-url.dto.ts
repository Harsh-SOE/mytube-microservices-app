import { AwsGetPresignedUrlParams } from '../interfaces/params/get-presigned-url';
import { CloudinaryGetPresignedUrlParams } from '../interfaces/params/get-presigned-url';
import { GCPGetPreSignedUrlParams } from '../interfaces/params/get-presigned-url';

// discriminated union
export type GetPreSignedUrlDto =
  | AwsGetPresignedUrlParams
  | CloudinaryGetPresignedUrlParams
  | GCPGetPreSignedUrlParams;
