import { Module } from '@nestjs/common';

import { AppConfigModule } from '@likes/config';
import { LikesModule } from '@likes/application/likes';
import { LogsModule } from '@likes/infrastructure/logs';
import { MeasureModule } from '@likes/infrastructure/measure';

@Module({
  imports: [AppConfigModule, LikesModule, LogsModule, MeasureModule],
})
export class AppModule {}
