import { CLOUD_PROVIDER } from '@app/contracts/cloud';
import { AppConfigService } from '@cloud/infrastructure/config';
import { AwsS3StorageAdapter } from './aws-storage.adapter';
import { CloudinaryStorageAdapter } from './cloudinary-storage.adapter';
import { GCPStorageAdapter } from './gcp-storage.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageAdapter {
  constructor(
    private configService: AppConfigService,
    private aws: AwsS3StorageAdapter,
    private cloudinary: CloudinaryStorageAdapter,
    private gcp: GCPStorageAdapter,
  ) {}

  getProvider() {
    const provider = this.configService.CLOUD_PROVIDER;

    switch (provider) {
      case CLOUD_PROVIDER.AWS: {
        return this.aws;
      }

      case CLOUD_PROVIDER.Cloudinary: {
        return this.cloudinary;
      }

      case CLOUD_PROVIDER.GCP: {
        return this.gcp;
      }

      default: {
        throw new Error(`Invalid CloudProvider configuration was selected`);
      }
    }
  }
}
