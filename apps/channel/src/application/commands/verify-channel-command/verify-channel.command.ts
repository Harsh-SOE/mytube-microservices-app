import { ChannelVerifyByIdDto } from '@app/contracts/channel';

export class VerifyChannelCommand {
  public constructor(public readonly verifyChannelDto: ChannelVerifyByIdDto) {}
}
