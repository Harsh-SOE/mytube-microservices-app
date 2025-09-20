import { Module } from '@nestjs/common';

import { LogsModule } from './infrastructure/logs';

import { AppConfigModule } from './config/config.module';
import { PersistanceModule } from './infrastructure/persistance/persistance.module';
import { LikesConsumerModule } from './application/likes-consumer/likes-consumer.module';
import { AggregatorCacheModule } from './infrastructure/cache/cache.module';

@Module({
  imports: [
    LikesConsumerModule,
    PersistanceModule,
    AppConfigModule,
    LogsModule,
    AggregatorCacheModule,
  ],
})
export class AggregatorModule {}
