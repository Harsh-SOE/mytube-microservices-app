import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { HubCreatedEvent } from '@hub/application/events';
import { HubEntity } from '@hub/domain/entities';
import { HubBio, HubCoverImage, HubUserId } from '@hub/domain/value-objects';

import { AggregateFactory } from './aggregate.factory';
import { HubAggregate } from '../aggregates';

@Injectable()
export class HubAggregateFactory implements AggregateFactory<HubAggregate> {
  constructor(public readonly eventPublisher: EventPublisher) {}

  create(
    id: string,
    userId: string,
    bio?: string,
    coverImage?: string,
    isHubVerified?: boolean,
    isHubMonitized?: boolean,
  ): HubAggregate {
    const hubEntity = new HubEntity(
      id,
      HubUserId.create(userId),
      HubBio.create(bio),
      HubCoverImage.create(coverImage),
      isHubVerified,
      isHubMonitized,
    );
    const hub = this.eventPublisher.mergeObjectContext(
      new HubAggregate(hubEntity),
    );
    hub.apply(new HubCreatedEvent(hub));
    return hub;
  }
}
