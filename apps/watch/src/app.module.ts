import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/config.module';
import { WatchModule } from './application/watch/watch.module';
import { PersistanceModule } from './infrastructure/persistance/persistance.module';

@Module({
  imports: [AppConfigModule, WatchModule, PersistanceModule],
})
export class AppModule {}
