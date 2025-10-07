import { Injectable } from '@nestjs/common';

import { IAggregatePersistanceACL } from '@app/infrastructure';

import { Hub } from '@peristance/hub';
import { HubAggregate } from '@hub/domain/aggregates';
import { HubEntity } from '@hub/domain/entities';
import { HubBio, HubCoverImage, HubUserId } from '@hub/domain/value-objects';

@Injectable()
export class HubAggregatePersistanceACL
  implements
    IAggregatePersistanceACL<HubAggregate, Omit<Hub, 'createdAt' | 'updatedAt'>>
{
  toAggregate(schema: Omit<Hub, 'createdAt' | 'updatedAt'>): HubAggregate {
    const hubEntity = new HubEntity(
      schema.id,
      HubUserId.create(schema.userId),
      HubBio.create(schema.bio ?? undefined),
      HubCoverImage.create(schema.hubCoverImage ?? undefined),
      schema.isHubMonitized ?? undefined,
      schema.isHubVerified ?? undefined,
    );
    return new HubAggregate(hubEntity);
  }

  toPersistance(model: HubAggregate): Omit<Hub, 'createdAt' | 'updatedAt'> {
    return {
      id: model.getHubSnapshot().id,
      userId: model.getHubSnapshot().userId,
      bio: model.getHubSnapshot().bio ?? null,
      hubCoverImage: model.getHubSnapshot().coverImage ?? null,
      isHubMonitized: model.getHubSnapshot().isHubMonitized ?? null,
      isHubVerified: model.getHubSnapshot().isHubVerified ?? null,
    };
  }
}
