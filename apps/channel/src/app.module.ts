import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { AppHealthModule } from './infrastructure/health';
import { GrpcModule } from './presentation/grpc';
import { LOGGER_PORT } from './application/ports';
import { WinstonLoggerAdapter } from './infrastructure/logger';

@Module({
  imports: [AppConfigModule, AppHealthModule, GrpcModule],
  providers: [{ provide: LOGGER_PORT, useClass: WinstonLoggerAdapter }],
})
export class AppModule {}
