import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BullModule } from '@nestjs/bullmq';

import {
  AppConfigModule,
  AppConfigService,
} from '@transcoder/infrastructure/config';
import {
  SEGMENT_DELETE_QUEUE,
  SEGMENT_UPLOADER_QUEUE,
  TRANSCODER_JOB_QUEUE,
} from '@transcoder/utils/constants';
import {
  BullSegmentUploadWorker,
  BullTranscodeJobsWorker,
} from '@transcoder/infrastructure/jobs';
import { SegmentWatcher } from '@transcoder/infrastructure/transcoder/segment-watcher/watcher';
import { KafkaMessageHandler } from '@transcoder/infrastructure/message-broker/filter';
import {
  LOGGER_PORT,
  MESSAGE_BROKER,
  STORAGE_PORT,
  TRANSCODER_PORT,
} from '@transcoder/application/ports';
import { AwsS3StorageAdapter } from '@transcoder/infrastructure/storage/adapters';
import { FFmpegVideoTranscoderUploaderAdapter } from '@transcoder/infrastructure/transcoder/adapters';
import { WinstonLoggerAdapter } from '@transcoder/infrastructure/logger';
import { KafkaMessageBrokerAdapter } from '@transcoder/infrastructure/message-broker/adapters';
import { VideoTranscoderCommandHandlers } from '@transcoder/application/commands';

import { VideoTranscoderService } from './message-broker.service';
import { VideoTranscoderController } from './message-broker.controller';

@Module({
  imports: [
    AppConfigModule,
    CqrsModule,

    BullModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        connection: {
          host: configService.REDIS_HOST,
          port: configService.REDIS_PORT,
        },
      }),
    }),
    // job for transcoding a video...
    BullModule.registerQueue(
      { name: TRANSCODER_JOB_QUEUE },
      { name: SEGMENT_UPLOADER_QUEUE },
      { name: SEGMENT_DELETE_QUEUE },
    ),
  ],
  controllers: [VideoTranscoderController],
  providers: [
    VideoTranscoderService,
    BullTranscodeJobsWorker,
    BullSegmentUploadWorker,
    AppConfigService,
    KafkaMessageHandler,
    SegmentWatcher,
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
    { provide: STORAGE_PORT, useClass: AwsS3StorageAdapter },
    {
      provide: TRANSCODER_PORT,
      useClass: FFmpegVideoTranscoderUploaderAdapter,
    },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    ...VideoTranscoderCommandHandlers,
  ],
  exports: [STORAGE_PORT, TRANSCODER_PORT, LOGGER_PORT, MESSAGE_BROKER],
})
export class VideoTranscoderModule {}
