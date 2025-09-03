import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config/config.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [AppConfigModule, LogsModule],
})
export class EmailModule {}
