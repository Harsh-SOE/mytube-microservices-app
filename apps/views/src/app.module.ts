import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { WatchModule } from './application/views/views.module';
import { ViewsCacheModule } from './infrastructure/cache';
import { AppHealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [AppConfigModule, WatchModule, ViewsCacheModule, AppHealthModule],
})
export class AppModule {}
