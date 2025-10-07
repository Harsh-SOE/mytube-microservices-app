import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';

import { HubFindByIdResponse } from '@app/contracts/hub';

import { HubQueryRepository } from '@hub/infrastructure/repository';

import { FindHubByIdQuery } from './find-hub-by-id.query';

@QueryHandler(FindHubByIdQuery)
export class FindHubByIdQueryHandler
  implements ICommandHandler<FindHubByIdQuery>
{
  public constructor(public readonly hubRespository: HubQueryRepository) {}

  async execute({
    findBioById: findHubById,
  }: FindHubByIdQuery): Promise<HubFindByIdResponse> {
    const { id } = findHubById;
    const hub = await this.hubRespository.findById(id);
    return {
      ...hub,
      bio: hub.bio ?? undefined,
      hubCoverImage: hub.hubCoverImage ?? undefined,
      isHubMonitized: hub.isHubMonitized ?? undefined,
      isHubVerified: hub.isHubVerified ?? undefined,
    };
  }
}
