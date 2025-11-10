import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { VIDEO_TRANSCODER_PATTERN } from '@app/clients';
import { TranscodeVideoMessage } from '@app/contracts/video-transcoder';

import { VideoTranscoderService } from './message-broker.service';

@Controller()
export class VideoTranscoderController {
  constructor(
    private readonly videoTranscoderService: VideoTranscoderService,
  ) {}

  @EventPattern(VIDEO_TRANSCODER_PATTERN.TRANSCODE_VIDEO)
  transcodeVideo(@Payload() createVideoTranscoderDto: TranscodeVideoMessage) {
    return this.videoTranscoderService.transcodeVideo(createVideoTranscoderDto);
  }
}
