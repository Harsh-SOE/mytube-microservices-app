import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/config.module';
import { SagaModule } from './saga/saga.module';
import { LogsModule } from './logs/logs.module';
import { AppHealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [AppConfigModule, SagaModule, LogsModule, AppHealthModule],
})
export class AppModule {}
