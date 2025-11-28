import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { VIDEO_TRANSCODER_PATTERN } from '@app/clients';
import { TranscodeVideoMessage } from '@app/contracts/video-transcoder';

import { LOGGER_PORT, LoggerPort } from '@transcoder/application/ports';

import { VideoTranscoderService } from './message-broker.service';

@Controller()
export class VideoTranscoderController {
  constructor(
    private readonly videoTranscoderService: VideoTranscoderService,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {}

  @EventPattern(VIDEO_TRANSCODER_PATTERN.TRANSCODE_VIDEO)
  transcodeVideo(@Payload() transcodeVideoMessage: TranscodeVideoMessage) {
    this.logger.info(`Transcoding video with info: `, transcodeVideoMessage);

    return this.videoTranscoderService.transcodeVideo(transcodeVideoMessage);
  }
}
