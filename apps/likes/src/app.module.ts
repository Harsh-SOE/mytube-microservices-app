import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/config.module';
import { LikesModule } from './likes/likes.module';
import { LogsModule } from './logs/logs.module';
import { MeasureModule } from './measure/measure.module';

@Module({
  imports: [AppConfigModule, LikesModule, LogsModule, MeasureModule],
})
export class AppModule {}
