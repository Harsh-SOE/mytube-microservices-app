import { Injectable } from '@nestjs/common';

import { IAggregatePersistanceACL } from '@app/infrastructure';

import { VideoAggregate } from '@videos/domain/aggregates';
import { VideoEntity } from '@videos/domain/entities';
import {
  VideoDescription,
  VideoOwner,
  VideoPublish,
  VideoTitle,
  VideoFileIdentifier,
  VideoVisibilty,
} from '@videos/domain/value-objects';

import { Video } from '@peristance/videos';

@Injectable()
export class VideoAggregatePersistanceACL
  implements
    IAggregatePersistanceACL<
      VideoAggregate,
      Omit<Video, 'publishedAt' | 'updatedAt'>
    >
{
  public toAggregate(
    persistance: Omit<Video, 'publishedAt' | 'updatedAt'>,
  ): VideoAggregate {
    const videoEntity = new VideoEntity(
      persistance.id,
      VideoTitle.create(persistance.title),
      VideoFileIdentifier.create(persistance.videoFileUrl),
      VideoPublish.create(persistance.videoPublishStatus.toString()),
      VideoVisibilty.create(persistance.videoVisibiltyStatus.toString()),
      VideoOwner.create(persistance.ownerId),
      VideoDescription.create(persistance.description ?? undefined),
    );

    return new VideoAggregate(videoEntity);
  }
  public toPersistance(
    aggregate: VideoAggregate,
  ): Omit<Video, 'publishedAt' | 'updatedAt'> {
    return {
      id: aggregate.getVideo().getId(),
      title: aggregate.getVideo().getTitle(),
      description: aggregate.getVideo().getDescription() ?? null,
      ownerId: aggregate.getVideo().getOwnerId(),
      videoFileUrl: aggregate.getVideo().getVideoFileIdentifier(),
      videoPublishStatus: aggregate.getVideo().getPublishStatus(),
      videoVisibiltyStatus: aggregate.getVideo().getVisibiltyStatus(),
    };
  }
}
