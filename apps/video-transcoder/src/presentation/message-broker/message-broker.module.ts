import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  LOGGER_PORT,
  MESSAGE_BROKER,
  STORAGE_PORT,
  TRANSCODER_PORT,
} from '@transcoder/application/ports';
import { VideoTranscoderCommandHandlers } from '@transcoder/application/commands';
import {
  AppConfigModule,
  AppConfigService,
} from '@transcoder/infrastructure/config';
import { AwsS3StorageAdapter } from '@transcoder/infrastructure/storage/adapters';
import { FFmpegVideoTranscoderAdapter } from '@transcoder/infrastructure/transcoder/adapters';
import { KafkaMessageBrokerAdapter } from '@transcoder/infrastructure/message-broker/adapters';
import { KafkaMessageHandler } from '@transcoder/infrastructure/message-broker/filter';
import { WinstonLoggerAdapter } from '@transcoder/infrastructure/logger';

import { VideoTranscoderService } from './message-broker.service';
import { VideoTranscoderController } from './message-broker.controller';

@Module({
  imports: [AppConfigModule, CqrsModule],
  controllers: [VideoTranscoderController],
  providers: [
    VideoTranscoderService,
    AppConfigService,
    KafkaMessageHandler,
    { provide: STORAGE_PORT, useClass: AwsS3StorageAdapter },
    { provide: TRANSCODER_PORT, useClass: FFmpegVideoTranscoderAdapter },
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    ...VideoTranscoderCommandHandlers,
  ],
  exports: [STORAGE_PORT, TRANSCODER_PORT, LOGGER_PORT, MESSAGE_BROKER],
})
export class VideoTranscoderModule {}
