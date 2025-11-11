import { Module } from '@nestjs/common';

import { MeasureModule } from '@users/infrastructure/measure';
import { AppConfigModule } from '@users/infrastructure/config';

import { AppHealthModule } from './infrastructure/health';
import { GrpcModule } from './presentation/grpc';
import { LOGGER_PORT } from './application/ports';
import { WinstonLoggerAdapter } from './infrastructure/logger';

@Module({
  imports: [GrpcModule, MeasureModule, AppConfigModule, AppHealthModule],
  providers: [{ provide: LOGGER_PORT, useClass: WinstonLoggerAdapter }],
})
export class AppModule {}
