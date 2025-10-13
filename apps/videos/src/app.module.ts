import { Module } from '@nestjs/common';

import { VideosModule } from '@videos/application/videos';
import { PersistanceModule } from '@videos/infrastructure/persistance';
import { AppConfigModule } from '@videos/infrastructure/config';
import { MeasureModule } from '@videos/infrastructure/measure';
import { LogsModule } from '@videos/infrastructure/logs';
import { AppHealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    VideosModule,
    PersistanceModule,
    MeasureModule,
    LogsModule,
    AppConfigModule,
    AppHealthModule,
  ],
})
export class AppModule {}
