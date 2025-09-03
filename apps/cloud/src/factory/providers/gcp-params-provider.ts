import { Injectable } from '@nestjs/common';

import {
  CloudPresignedUrlDto,
  CLOUD_PROVIDER,
  UploadToCloudDto,
  GCPUploadParams,
} from '@app/contracts/cloud';

import { AppConfigService } from '../../config/config.service';
import { IGetParams } from './get-params';

@Injectable()
export class GcpParamsProvider implements IGetParams {
  readonly provider: CLOUD_PROVIDER = CLOUD_PROVIDER.GCP;
  constructor(private configService: AppConfigService) {}
  getParams(fileMetaData: CloudPresignedUrlDto): UploadToCloudDto {
    return {
      provider: CLOUD_PROVIDER.GCP,
      Bucket: this.configService.GCP_BUCKET,
      name: fileMetaData.fileName,
    } as GCPUploadParams;
  }
}
