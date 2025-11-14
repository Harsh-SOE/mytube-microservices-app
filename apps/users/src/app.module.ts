import { Module } from '@nestjs/common';

import { MeasureModule } from '@users/infrastructure/measure';
import { AppConfigModule } from '@users/infrastructure/config';

import { AppHealthModule } from './infrastructure/health';
import { GrpcModule } from './presentation/grpc';

@Module({
  imports: [GrpcModule, MeasureModule, AppConfigModule, AppHealthModule],
})
export class AppModule {}
