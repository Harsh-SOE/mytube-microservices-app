import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppHealthModule } from './infrastructure/health/health.module';
import { AppConfigModule } from './infrastructure/config';
import { LikesModule } from './presentation/grpc';
import { LOGGER_PORT } from './application/ports';
import { WinstonLoggerAdapter } from './infrastructure/logger';

@Module({
  imports: [
    AppConfigModule,
    LikesModule,
    AppHealthModule,
    ScheduleModule.forRoot(),
  ],
  providers: [{ provide: LOGGER_PORT, useClass: WinstonLoggerAdapter }],
})
export class AppModule {}
