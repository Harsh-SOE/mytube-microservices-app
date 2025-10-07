import { AggregateRoot } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { HubEntity } from '@hub/domain/entities';
import { HubMonitizedEvent, HubUpdatedEvent } from '@hub/application/events';

@Injectable()
export class HubAggregate extends AggregateRoot {
  public constructor(private hubEntity: HubEntity) {
    super();
  }

  public getHubEntity() {
    return this.hubEntity;
  }

  public getHubSnapshot() {
    return this.hubEntity.getHubSnapshot();
  }

  public updateHubDetails(bio?: string, coverImage?: string) {
    this.hubEntity.updateHubBio(bio);
    this.hubEntity.updateHubCoverImage(coverImage);
    this.apply(new HubUpdatedEvent(this));
  }

  public updateHubVerificationStatus() {
    this.hubEntity.verifyHub();
  }

  public updateHubMonitizedStatus(newStatus: boolean) {
    if (newStatus) {
      this.hubEntity.monitizeHub();
      return;
    }
    this.hubEntity.demonitizeHub();
    this.apply(new HubMonitizedEvent(this));
  }
}
