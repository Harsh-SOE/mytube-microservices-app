import { ChannelActivateMonitizationDto } from '@app/contracts/channel';

export class ActivateMonitizationCommand {
  public constructor(
    public readonly channelActivateMonitizationDto: ChannelActivateMonitizationDto,
  ) {}
}
