import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CLIENT_PROVIDER, VIDEO_TRANSCODER_PATTERN } from '@app/clients';

import { VideoCreatedEvent } from './video-created.event';

@EventsHandler(VideoCreatedEvent)
export class VideoCreatedEventHandler
  implements IEventHandler<VideoCreatedEvent>
{
  constructor(
    @Inject(CLIENT_PROVIDER.VIDEO_TRANSCODER) private videoClient: ClientKafka,
  ) {}

  public handle({ videoCreatedEventDto }: VideoCreatedEvent) {
    this.videoClient.emit(VIDEO_TRANSCODER_PATTERN.TRANSCODE_VIDEO, {
      key: `TranscodeVideo`,
      value: JSON.stringify(videoCreatedEventDto),
    });
  }
}
