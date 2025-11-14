import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { AppHealthModule } from './infrastructure/health';
import { GrpcModule } from './presentation/grpc';

@Module({
  imports: [AppConfigModule, AppHealthModule, GrpcModule],
})
export class AppModule {}
