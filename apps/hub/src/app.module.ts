import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config/config.module';
import { AppHealthModule } from './infrastructure/health/health.module';
import { PersistanceModule } from './infrastructure/persistance/persistance.module';
import { HubModule } from './application/hub/hub.module';

@Module({
  imports: [AppConfigModule, AppHealthModule, HubModule, PersistanceModule],
})
export class AppModule {}
