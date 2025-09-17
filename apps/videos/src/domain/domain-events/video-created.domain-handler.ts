import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VideoCreatedDomainEvent } from './video-created.domain-event';
import { Inject } from '@nestjs/common';
import { CLIENT_PROVIDER, VIDEO_TRANSCODER_PATTERN } from '@app/clients';
import { ClientKafka } from '@nestjs/microservices';

@EventsHandler(VideoCreatedDomainEvent)
export class VideoCreatedDomainEventHandler
  implements IEventHandler<VideoCreatedDomainEvent>
{
  constructor(
    @Inject(CLIENT_PROVIDER.VIDEO_TRANSCODER) private videoClient: ClientKafka,
  ) {}

  handle({ videoCreatedEventDto }: VideoCreatedDomainEvent) {
    console.log(
      `video Created: ${JSON.stringify(videoCreatedEventDto)}, Transmitting message`,
    );
    // Publish a message to kafka
    this.videoClient.emit(VIDEO_TRANSCODER_PATTERN.TRANSCODE_VIDEO, {
      key: `TrancodeVideo`,
      value: JSON.stringify(videoCreatedEventDto),
    });
  }
}
