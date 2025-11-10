import { Module } from '@nestjs/common';

import { STORAGE_PORT, TRANSCODER_PORT } from '@transcoder/application/ports';
import { VideoTranscoderCommandHandlers } from '@transcoder/application/commands';
import {
  AppConfigModule,
  AppConfigService,
} from '@transcoder/infrastructure/config';
import { AwsS3StorageAdapter } from '@transcoder/infrastructure/storage/adapters';
import { FFmpegVideoTranscoderAdapter } from '@transcoder/infrastructure/transcoder/adapters';

import { VideoTranscoderService } from './message-broker.service';
import { VideoTranscoderController } from './message-broker.controller';

@Module({
  imports: [AppConfigModule],
  controllers: [VideoTranscoderController],
  providers: [
    VideoTranscoderService,
    AppConfigService,
    { provide: STORAGE_PORT, useClass: AwsS3StorageAdapter },
    { provide: TRANSCODER_PORT, useClass: FFmpegVideoTranscoderAdapter },
    ...VideoTranscoderCommandHandlers,
  ],
})
export class VideoTranscoderModule {}
