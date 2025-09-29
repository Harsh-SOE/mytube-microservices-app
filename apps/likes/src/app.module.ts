import { Module } from '@nestjs/common';

import { AppConfigModule } from '@likes/config';
import { LikesModule } from '@likes/application/likes';
import { LogsModule } from '@likes/infrastructure/logs';
import { MeasureModule } from '@likes/infrastructure/measure';
import { AppHealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    AppConfigModule,
    LikesModule,
    LogsModule,
    MeasureModule,
    AppHealthModule,
  ],
})
export class AppModule {}
