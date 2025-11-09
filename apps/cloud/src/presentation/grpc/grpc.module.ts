import { Module } from '@nestjs/common';

import { STORAGE_PORT } from '@cloud/application';
import {
  AwsS3StorageAdapter,
  CloudinaryStorageAdapter,
  GCPStorageAdapter,
} from '@cloud/infrastructure/storage/adapters';
import { AppConfigModule } from '@cloud/infrastructure/config';

import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';

@Module({
  imports: [AppConfigModule, GrpcModule],
  controllers: [GrpcController],
  providers: [
    GrpcService,
    AwsS3StorageAdapter,
    CloudinaryStorageAdapter,
    GCPStorageAdapter,
    { provide: STORAGE_PORT, useClass: AwsS3StorageAdapter },
  ],
})
export class GrpcModule {}
