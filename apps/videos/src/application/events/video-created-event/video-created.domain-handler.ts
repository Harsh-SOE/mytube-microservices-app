import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CLIENT_PROVIDER, VIDEO_TRANSCODER_PATTERN } from '@app/clients';

import { VideoCreatedDomainEvent } from './video-created.domain-event';

@EventsHandler(VideoCreatedDomainEvent)
export class VideoCreatedDomainEventHandler
  implements IEventHandler<VideoCreatedDomainEvent>
{
  constructor(
    @Inject(CLIENT_PROVIDER.VIDEO_TRANSCODER) private videoClient: ClientKafka,
  ) {}

  public handle({ videoCreatedEventDto }: VideoCreatedDomainEvent) {
    console.log(
      `video Created: ${JSON.stringify(videoCreatedEventDto)}, Transmitting message`,
    );

    this.videoClient.emit(VIDEO_TRANSCODER_PATTERN.TRANSCODE_VIDEO, {
      key: `TrancodeVideo`,
      value: JSON.stringify(videoCreatedEventDto),
    });
  }
}
