import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { LOGGER_PORT } from './application/ports';
import { AppConfigModule } from './infrastructure/config';
import { AppHealthModule } from './infrastructure/health';
import { WinstonLoggerAdapter } from './infrastructure/logger';

import { GrpcModule } from './presentation/grpc';

@Module({
  imports: [
    AppConfigModule,
    GrpcModule,
    AppHealthModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: LOGGER_PORT,
      useClass: WinstonLoggerAdapter,
    },
  ],
})
export class AppModule {}
