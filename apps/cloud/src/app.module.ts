import { Module } from '@nestjs/common';

import { CloudModule } from './cloud/cloud.module';
import { AppConfigModule } from './config/config.module';
import { MeasureModule } from './measure/measure.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [CloudModule, AppConfigModule, MeasureModule, LogsModule],
})
export class AppModule {}
