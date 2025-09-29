import { Module } from '@nestjs/common';

import { AppConfigModule } from '@cloud/infrastructure/config';
import { LogsModule } from '@cloud/infrastructure/logs';
import {
  AwsS3StorageAdapter,
  CloudinaryStorageAdapter,
  GCPStorageAdapter,
  StorageAdapter,
} from '@cloud/infrastructure/adapter/storage';

import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';

@Module({
  imports: [AppConfigModule, StorageModule, LogsModule],
  controllers: [StorageController],
  providers: [
    StorageService,
    AwsS3StorageAdapter,
    CloudinaryStorageAdapter,
    GCPStorageAdapter,
    StorageAdapter,
  ],
})
export class StorageModule {}
