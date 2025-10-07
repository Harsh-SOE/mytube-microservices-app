import { HubUpdateByIdDto } from '@app/contracts/hub';

export class UpdateHubCommand {
  public constructor(public readonly hubUpdateByIdDto: HubUpdateByIdDto) {}
}
