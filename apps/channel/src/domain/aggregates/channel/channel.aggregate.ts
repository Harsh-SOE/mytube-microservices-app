import { AggregateRoot } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { ChannelEntity } from '@channel/domain/entities';
import {
  ChannelCreatedEvent,
  ChannelMonitizedEvent,
  ChannelUpdatedEvent,
} from '@channel/application/events';

@Injectable()
export class ChannelAggregate extends AggregateRoot {
  public constructor(private channelEntity: ChannelEntity) {
    super();
  }

  public getChannelEntity() {
    return this.channelEntity;
  }

  public getChannelSnapshot() {
    return this.channelEntity.getChannelSnapshot();
  }

  public static create(
    id: string,
    userId: string,
    bio?: string,
    coverImage?: string,
    isChannelVerified?: boolean,
    isChannelMonitized?: boolean,
  ): ChannelAggregate {
    const channelEntity = ChannelEntity.create(
      id,
      userId,
      bio,
      coverImage,
      isChannelVerified,
      isChannelMonitized,
    );
    const channelAggregate = new ChannelAggregate(channelEntity);

    channelAggregate.apply(new ChannelCreatedEvent(channelAggregate));
    return channelAggregate;
  }

  public updateChannelDetails(bio?: string, coverImage?: string) {
    this.channelEntity.updateChannelBio(bio);
    this.channelEntity.updateChannelCoverImage(coverImage);
    this.apply(new ChannelUpdatedEvent(this));
  }

  public updateChannelVerificationStatus() {
    this.channelEntity.verifyChannel();
  }

  public updateChannelMonitizedStatus(newStatus: boolean) {
    if (newStatus) {
      this.channelEntity.monitizeChannel();
      return;
    }
    this.channelEntity.demonitizeChannel();
    this.apply(new ChannelMonitizedEvent(this));
  }
}
