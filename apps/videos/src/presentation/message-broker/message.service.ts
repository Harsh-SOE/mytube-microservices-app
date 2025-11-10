import { Injectable } from '@nestjs/common';
import { IEventBus } from '@nestjs/cqrs';

import { VideoTranscodedUpdateIdentifierDto } from '@app/contracts/video-transcoder';

import { VideoTranscodedEvent } from '@videos/application/events';

@Injectable()
export class MessageHandlerService {
  public constructor(private readonly eventBus: IEventBus) {}

  updateVideoIdentifier(
    transcodedVideoMessage: VideoTranscodedUpdateIdentifierDto,
  ) {
    this.eventBus.publish<VideoTranscodedEvent>(
      new VideoTranscodedEvent(transcodedVideoMessage),
    );
  }
}
