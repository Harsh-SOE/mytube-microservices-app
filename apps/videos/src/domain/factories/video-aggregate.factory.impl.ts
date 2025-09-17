import { Injectable } from '@nestjs/common';

import { AggregateFactory } from './aggregate.factory';
import { VideoAggregate } from '../aggregates/video/video.aggregate';
import { VideoEntity } from '../entities/video/video.entity';
import {
  VideoDescription,
  VideoOwner,
  VideoPublish,
  VideoTitle,
  VideoUrl,
  VideoVisibilty,
} from '../value-objects';
import {
  GrpcToDomainPublishEnumMapper,
  GrpcToDomainVisibilityEnumMapper,
} from '@videos/infrastructure/anti-corruption';
import {
  VideoTransportPublishStatus,
  VideoTransportVisibilityStatus,
} from '@app/contracts/videos';
import { VideoCreatedDomainEvent } from '../domain-events';

@Injectable()
export class VideoAggregateFactory implements AggregateFactory<VideoAggregate> {
  create(
    id: string,
    title: string,
    ownerId: string,
    videoUrl: string,
    publishStatus: VideoTransportPublishStatus,
    visibilityStatus: VideoTransportVisibilityStatus,
    description?: string,
  ): VideoAggregate {
    const domainVisibiltyStatus =
      GrpcToDomainPublishEnumMapper.get(publishStatus);
    const domainPublishStatus =
      GrpcToDomainVisibilityEnumMapper.get(visibilityStatus);
    if (!domainVisibiltyStatus || !domainPublishStatus) {
      throw new Error(`Invalid inputs for publish and visibilty status`);
    }

    const videoEntity = new VideoEntity(
      id,
      VideoTitle.create(title),
      VideoUrl.create(videoUrl),
      VideoPublish.create(domainVisibiltyStatus),
      VideoVisibilty.create(domainPublishStatus),
      VideoOwner.create(ownerId),
      VideoDescription.create(description),
    );

    const videoAggregate = new VideoAggregate(videoEntity);
    videoAggregate.apply(
      new VideoCreatedDomainEvent({
        key: videoAggregate.getVideo().getVideoUrl(),
        videoId: videoAggregate.getVideo().getId(),
      }),
    );
    return videoAggregate;
  }
}
