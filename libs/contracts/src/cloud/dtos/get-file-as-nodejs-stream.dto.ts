import {
  AwsGetFileAsNodeJsStreamParam,
  CloudinaryGetFileAsNodeJsStreamParam,
  GcpGetFileAsNodeJsStreamParam,
} from '../interfaces';

export type GetFileAsNodeJsStreamDto =
  | AwsGetFileAsNodeJsStreamParam
  | CloudinaryGetFileAsNodeJsStreamParam
  | GcpGetFileAsNodeJsStreamParam;
