import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { AppHealthModule } from './infrastructure/health';

@Module({
  imports: [AppConfigModule, AppHealthModule],
})
export class AppModule {}
