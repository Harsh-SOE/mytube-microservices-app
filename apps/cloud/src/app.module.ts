import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { MeasureModule } from './infrastructure/measure';
import { LogsModule } from './infrastructure/logs';
import { AppHealthModule } from './infrastructure/health';
import { StorageModule } from './presentation/storage';

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
