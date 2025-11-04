import { Injectable } from '@nestjs/common';

import { IAggregatePersistanceACL } from '@app/infrastructure';

import { LikeAggregate } from '@likes/domain/aggregates';
import { LikeEntity } from '@likes/domain/entities';
import { LikeStatus, UserId, VideoId } from '@likes/domain/value-objects';

import { VideoLikes } from '@peristance/likes';

@Injectable()
export class LikePersistanceACL
  implements
    IAggregatePersistanceACL<
      LikeAggregate,
      Omit<VideoLikes, 'createdAt' | 'updatedAt'>
    >
{
  public toAggregate(
    schema: Omit<VideoLikes, 'createdAt' | 'updatedAt'>,
  ): LikeAggregate {
    const likeEntity = new LikeEntity(
      schema.id,
      UserId.create(schema.userId),
      VideoId.create(schema.videoId),
      LikeStatus.create(schema.likeStatus),
    );
    return new LikeAggregate(likeEntity);
  }

  public toPersistance(
    model: LikeAggregate,
  ): Omit<VideoLikes, 'createdAt' | 'updatedAt'> {
    return {
      id: model.getEntity().getId(),
      userId: model.getEntity().getUserId(),
      videoId: model.getEntity().getVideoId(),
      likeStatus: model.getEntity().getLikeStatus(),
    };
  }
}
