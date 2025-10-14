import { Inject } from '@nestjs/common';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';

import { HubFindByIdResponse } from '@app/contracts/hub';

import {
  HUB_QUERY_REPOSITORY,
  HubQueryRepositoryPort,
} from '@hub/application/ports';

import { FindHubByIdQuery } from './find-hub-by-id.query';

@QueryHandler(FindHubByIdQuery)
export class FindHubByIdQueryHandler
  implements ICommandHandler<FindHubByIdQuery>
{
  public constructor(
    @Inject(HUB_QUERY_REPOSITORY)
    private readonly hubRespository: HubQueryRepositoryPort,
  ) {}

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
