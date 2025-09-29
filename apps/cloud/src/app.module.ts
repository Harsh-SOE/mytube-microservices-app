import { Module } from '@nestjs/common';

import { StorageModule } from './application/storage';
import { AppConfigModule } from './infrastructure/config';
import { MeasureModule } from './infrastructure/measure';
import { LogsModule } from './infrastructure/logs';
import { AppHealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    StorageModule,
    AppConfigModule,
    MeasureModule,
    LogsModule,
    AppHealthModule,
  ],
})
export class AppModule {}
