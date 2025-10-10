import { Module } from '@nestjs/common';

import { VideoTranscoderModule } from '@transcoder/application';
import { AppConfigModule } from '@transcoder/infrastructure/config';

import { LogsModule } from './infrastructure/logs';
import { AppHealthModule } from './infrastructure/health';

@Module({
  imports: [
    AppConfigModule,
    VideoTranscoderModule,
    LogsModule,
    AppHealthModule,
  ],
})
export class AppModule {}
