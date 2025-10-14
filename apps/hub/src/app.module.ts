import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { AppHealthModule } from './infrastructure/health';
import { PersistanceModule } from './infrastructure/persistance';
import { HubModule } from './presentation/hub';

@Module({
  imports: [AppConfigModule, AppHealthModule, HubModule, PersistanceModule],
})
export class AppModule {}
