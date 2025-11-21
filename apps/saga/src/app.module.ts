import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/config.module';
import { SagaModule } from './saga/saga.module';
import { AppHealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [AppConfigModule, SagaModule, AppHealthModule],
})
export class AppModule {}
