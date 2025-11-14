import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { TranscodeVideoMessage } from '@app/contracts/video-transcoder';

import { TranscodeVideoCommand } from '@transcoder/application/commands';

@Injectable()
export class VideoTranscoderService {
  public constructor(private readonly commandBus: CommandBus) {}

  public transcodeVideo(transcodeVideoMessage: TranscodeVideoMessage) {
    return this.commandBus.execute<TranscodeVideoCommand, void>(
      new TranscodeVideoCommand(transcodeVideoMessage),
    );
  }
}
