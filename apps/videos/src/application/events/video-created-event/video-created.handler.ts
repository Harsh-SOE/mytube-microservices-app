import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MESSAGE_BROKER, MessageBrokerPort } from '@videos/application/ports';

import { VideoCreatedEvent } from './video-created.event';
import { VIDEO_TRANSCODER } from '@app/clients';

@EventsHandler(VideoCreatedEvent)
export class VideoCreatedEventHandler
  implements IEventHandler<VideoCreatedEvent>
{
  constructor(
    @Inject(MESSAGE_BROKER) private messaageBroker: MessageBrokerPort,
  ) {}

  public async handle({ transcodeVideoMessage }: VideoCreatedEvent) {
    await this.messaageBroker.publishMessage(
      VIDEO_TRANSCODER.TRANSCODE_VIDEO_EVENT,
      JSON.stringify(transcodeVideoMessage),
    );
  }
}
