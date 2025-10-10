import { Module } from '@nestjs/common';

import { LogsModule } from './infrastructure/logs';

import { AppConfigModule } from './config';
import { PersistanceModule } from './infrastructure/persistance';
import { LikesConsumerModule } from './application/likes-consumer';
import { AggregatorCacheModule } from './infrastructure/cache';
import { AppHealthModule } from './infrastructure/health';

@Module({
  imports: [
    LikesConsumerModule,
    PersistanceModule,
    AppConfigModule,
    LogsModule,
    AggregatorCacheModule,
    AppHealthModule,
  ],
})
export class AggregatorModule {}
