import { Module } from '@nestjs/common';

import { AppConfigModule } from '@videos/infrastructure/config';
import { MeasureModule } from '@videos/infrastructure/measure';
import { GrpcModule } from '@videos/presentation/grpc';

import { AppHealthModule } from './infrastructure/health';
import { LOGGER_PORT } from './application/ports';
import { WinstonLoggerAdapter } from './infrastructure/logger';
import { MessageModule } from './presentation/message-broker';

@Module({
  imports: [
    GrpcModule,
    MessageModule,
    MeasureModule,
    AppConfigModule,
    AppHealthModule,
  ],
  providers: [{ provide: LOGGER_PORT, useClass: WinstonLoggerAdapter }],
})
export class AppModule {}
