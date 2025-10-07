import { HubVerifyByIdDto } from '@app/contracts/hub';

export class VerifyHubCommand {
  public constructor(public readonly verifyHubDto: HubVerifyByIdDto) {}
}
