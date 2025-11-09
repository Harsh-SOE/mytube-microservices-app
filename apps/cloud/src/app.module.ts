import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { ObserverModule } from './infrastructure/observer';
import { AppHealthModule } from './infrastructure/health';
import { GrpcModule } from './presentation/grpc';
import { LOGGER_PORT } from './application';
import { WinstonLoggerAdapter } from './infrastructure/logger';

@Module({
  imports: [GrpcModule, AppConfigModule, ObserverModule, AppHealthModule],
  providers: [{ provide: LOGGER_PORT, useClass: WinstonLoggerAdapter }],
})
export class AppModule {}
