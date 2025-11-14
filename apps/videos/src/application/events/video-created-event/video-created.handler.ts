import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MESSAGE_BROKER, MessageBrokerPort } from '@videos/application/ports';

import { VideoCreatedEvent } from './video-created.event';

@EventsHandler(VideoCreatedEvent)
export class VideoCreatedEventHandler
  implements IEventHandler<VideoCreatedEvent>
{
  constructor(
    @Inject(MESSAGE_BROKER) private messaageBroker: MessageBrokerPort,
  ) {}

  public async handle({ videoCreatedEventDto }: VideoCreatedEvent) {
    await this.messaageBroker.publishMessage(
      'video.transcode',
      JSON.stringify(videoCreatedEventDto),
    );
  }
}
