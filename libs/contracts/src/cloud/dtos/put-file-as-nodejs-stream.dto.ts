import {
  AwsPutFileOnS3AsNodeJsStreamParam,
  CloudinaryPutFileOnS3AsNodeJsStreamParam,
  GcpPutFileOnS3AsNodeJsStreamParam,
} from '../interfaces';

export type PutFileOnS3AsNodeJsStreamDto =
  | AwsPutFileOnS3AsNodeJsStreamParam
  | CloudinaryPutFileOnS3AsNodeJsStreamParam
  | GcpPutFileOnS3AsNodeJsStreamParam;
