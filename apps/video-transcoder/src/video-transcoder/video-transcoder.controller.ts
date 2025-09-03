import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { VideoTranscoderService } from './video-transcoder.service';
import { VIDEO_TRANSCODER_PATTERN } from '@app/clients';
import { VideoTranscodeDto } from '@app/contracts/video-transcoder';

@Controller()
export class VideoTranscoderController {
  constructor(
    private readonly videoTranscoderService: VideoTranscoderService,
  ) {}

  @EventPattern(VIDEO_TRANSCODER_PATTERN.TRANSCODE_VIDEO)
  transcodeVideo(@Payload() createVideoTranscoderDto: VideoTranscodeDto) {
    return this.videoTranscoderService.transcodeVideo(createVideoTranscoderDto);
  }
}
