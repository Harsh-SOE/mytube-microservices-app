import { HubCreateDto } from '@app/contracts/hub';

export class CreateHubCommand {
  public constructor(public readonly hubCreateDto: HubCreateDto) {}
}
