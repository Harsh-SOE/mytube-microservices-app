import { CloudPresignedUrlDto } from '@app/contracts/cloud';
import { UploadToCloudDto } from '@app/contracts/cloud';

export interface IGetParams {
  getParams(fileMetaData: CloudPresignedUrlDto): UploadToCloudDto;
}
