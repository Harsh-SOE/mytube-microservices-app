import { Module } from '@nestjs/common';

import { CLOUD_PROVIDER } from '@app/contracts/cloud';

import { CloudController } from './cloud.controller';
import { CloudService } from './cloud.service';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { AwsCloudService } from '../services/aws.service';
import { CloudinaryService } from '../services/cloudinary.service';
import { GCPService } from '../services/gcp.service';
import { CloudParamsFactory } from '../factory/cloud-params.factory';
import { GrpcHealthController } from './grpc-health.controller';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [AppConfigModule, CloudModule, LogsModule],
  controllers: [CloudController, GrpcHealthController],
  providers: [
    CloudService,
    CloudParamsFactory,
    AwsCloudService,
    CloudinaryService,
    GCPService,
    {
      provide: 'CLOUD_STRATEGY',
      inject: [
        AppConfigService,
        AwsCloudService,
        CloudinaryService,
        GCPService,
      ],
      useFactory: (
        configService: AppConfigService,
        aws: AwsCloudService,
        cloudinary: CloudinaryService,
        gcp: GCPService,
      ) => {
        const provider = configService.CLOUD_PROVIDER;
        switch (provider) {
          case CLOUD_PROVIDER.AWS:
            return aws;
          case CLOUD_PROVIDER.Cloudinary:
            return cloudinary;
          case CLOUD_PROVIDER.GCP:
            return gcp;
          default:
            break;
        }
      },
    },
    {
      provide: 'CLOUD_UPLOAD_PARAMS',
      inject: [CloudParamsFactory],
      useFactory: (cloudParamsFactory: CloudParamsFactory) => {
        return cloudParamsFactory;
      },
    },
  ],
  exports: ['CLOUD_STRATEGY', 'CLOUD_UPLOAD_PARAMS'],
})
export class CloudModule {}
