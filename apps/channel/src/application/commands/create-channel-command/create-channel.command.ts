import { ChannelCreateDto } from '@app/contracts/channel';

export class CreateChannelCommand {
  public constructor(public readonly channelCreateDto: ChannelCreateDto) {}
}
