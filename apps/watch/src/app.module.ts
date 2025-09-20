import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { WatchModule } from './application/watch/watch.module';
import { WatchCacheModule } from './infrastructure/cache';

@Module({
  imports: [AppConfigModule, WatchModule, WatchCacheModule],
})
export class AppModule {}
