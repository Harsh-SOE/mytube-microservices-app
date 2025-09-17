import Stream, { Readable } from 'stream';

import {
  StreamFileToCloudResponse,
  UploadToCloudDto,
} from '@app/contracts/cloud';
import { CloudPreSignedUrlResponse } from '@app/contracts/cloud';

export interface CloudProviderService<UploadType extends UploadToCloudDto> {
  // Typescript type constraint
  // UploadType is a subtype of UploadToCloudDto
  // UploadType can be of any type, but it atleast contains all the props of UploadToCloudDto
  // UploadType is UploadParams + something extra

  getPreSignedUploadUrl(params: UploadType): Promise<CloudPreSignedUrlResponse>;

  getFileAsNodeJSReadableStream(key: string): Promise<Readable>;

  streamFileToCloud(
    key: string,
    fileStream: Stream,
    contentType: string,
  ): Promise<StreamFileToCloudResponse>;
}
