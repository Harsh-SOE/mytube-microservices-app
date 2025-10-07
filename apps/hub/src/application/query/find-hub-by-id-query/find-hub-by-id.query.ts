import { HubFindByIdDto } from '@app/contracts/hub';

export class FindHubByIdQuery {
  public constructor(public readonly findBioById: HubFindByIdDto) {}
}
