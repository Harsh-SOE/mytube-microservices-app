import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { VideoTranscoderModule } from './video-transcoder/video-transcoder.module';
import { LogsModule } from './logs';

@Module({
  imports: [AppConfigModule, VideoTranscoderModule, LogsModule],
})
export class AppModule {}
