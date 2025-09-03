import { Injectable } from '@nestjs/common';

import {
  CLOUD_PROVIDER,
  AwsUploadParams,
  UploadToCloudDto,
  CloudPresignedUrlDto,
} from '@app/contracts/cloud';

import { AppConfigService } from '../../config/config.service';
import { IGetParams } from './get-params';

@Injectable()
export class AwsParamsProvider implements IGetParams {
  readonly provider: CLOUD_PROVIDER = CLOUD_PROVIDER.AWS;
  constructor(private configService: AppConfigService) {}
  getParams(fileMetaData: CloudPresignedUrlDto): UploadToCloudDto {
    return {
      provider: CLOUD_PROVIDER.AWS,
      Bucket: this.configService.AWS_BUCKET,
      contentType: fileMetaData.mimeType,
      key: fileMetaData.dir
        ? `uploads/${fileMetaData.dir}/${fileMetaData.fileName}`
        : `uploads/${fileMetaData.fileName}`,
    } as AwsUploadParams;
  }
}
