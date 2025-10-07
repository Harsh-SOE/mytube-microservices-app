import { HubActivateMonitizationDto } from '@app/contracts/hub';

export class ActivateMonitizationCommand {
  public constructor(
    public readonly hubActivateMonitizationDto: HubActivateMonitizationDto,
  ) {}
}
