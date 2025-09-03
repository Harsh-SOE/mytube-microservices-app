import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VideoCreatedEvent } from './video-created.event';
import { Inject } from '@nestjs/common';
import { CLIENT_PROVIDER, VIDEO_TRANSCODER_PATTERN } from '@app/clients';
import { ClientKafka } from '@nestjs/microservices';

@EventsHandler(VideoCreatedEvent)
export class VideoCreatedHandler implements IEventHandler<VideoCreatedEvent> {
  constructor(
    @Inject(CLIENT_PROVIDER.VIDEO_TRANSCODER) private videoClient: ClientKafka,
  ) {}

  handle({ videoCreatedEventDto }: VideoCreatedEvent) {
    console.log(`video Created: ${JSON.stringify(videoCreatedEventDto)}`);
    // Publish a message to kafka
    this.videoClient.emit(VIDEO_TRANSCODER_PATTERN.TRANSCODE_VIDEO, {
      key: `TrancodeVideo`,
      value: JSON.stringify(videoCreatedEventDto),
    });
  }
}
