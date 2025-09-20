import { Module } from '@nestjs/common';
import { ViewsConsumerModule } from './application/views-consumer/views-consumer.module';
import { WatchCacheModule } from '@watch/infrastructure/cache';
import { PersistanceModule } from './infrastructure/persistance';
import { AppConfigModule } from './config';

@Module({
  imports: [
    ViewsConsumerModule,
    WatchCacheModule,
    PersistanceModule,
    AppConfigModule,
  ],
})
export class AppModule {}
