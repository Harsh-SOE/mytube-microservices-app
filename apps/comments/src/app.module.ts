import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppConfigModule } from './infrastructure/config';
import { AppHealthModule } from './infrastructure/health';

import { GrpcModule } from './presentation/grpc';

@Module({
  imports: [
    AppConfigModule,
    GrpcModule,
    AppHealthModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
