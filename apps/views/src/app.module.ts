import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { LOGGER_PORT } from './application/ports';
import { AppConfigModule } from './infrastructure/config';
import { AppHealthModule } from './infrastructure/health';
import { WinstonLoggerAdapter } from './infrastructure/logger';
import { GrpcModule } from './presentation/grpc/grpc.module';

@Module({
  imports: [AppConfigModule, GrpcModule, AppHealthModule, CqrsModule],
  providers: [{ provide: LOGGER_PORT, useClass: WinstonLoggerAdapter }],
})
export class AppModule {}
