import { Module } from '@nestjs/common';
import { LogsModule } from '@views-aggregator/infrastructure/logs';

import { PersistanceModule } from './infrastructure/persistance';
import { ViewsConsumerModule } from './application/views-consumer/views-consumer.module';
import { AppConfigModule } from './config';
import { ViewAggregatorCacheModule } from './infrastructure/cache';

@Module({
  imports: [
    ViewsConsumerModule,
    PersistanceModule,
    AppConfigModule,
    LogsModule,
    ViewAggregatorCacheModule,
  ],
})
export class AppModule {}
