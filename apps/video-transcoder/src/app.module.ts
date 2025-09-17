import { Module } from '@nestjs/common';

import { VideoTranscoderModule } from '@transcoder/application';
import { AppConfigModule } from '@transcoder/infrastructure/config';

import { LogsModule } from './infrastructure/logs';

@Module({
  imports: [AppConfigModule, VideoTranscoderModule, LogsModule],
})
export class AppModule {}
