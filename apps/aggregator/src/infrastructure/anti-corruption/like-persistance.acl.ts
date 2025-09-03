import { LikeAggregate } from '@aggregator/domain/aggregates';
import { LikeEntity } from '@aggregator/domain/entities';
import { LikeStatus, UserId, VideoId } from '@aggregator/domain/value-objects';
import { IAggregatePersistanceACL } from '@app/infrastructure';
import { Injectable } from '@nestjs/common';

import { VideoLikes } from '@peristance/aggregator';

@Injectable()
export class LikePersistanceACL
  implements
    IAggregatePersistanceACL<
      LikeAggregate,
      Omit<VideoLikes, 'createdAt' | 'updatedAt'>
    >
{
  toEntity(schema: Omit<VideoLikes, 'createdAt' | 'updatedAt'>): LikeAggregate {
    const likeEntity = new LikeEntity(
      schema.id,
      UserId.create(schema.userId),
      VideoId.create(schema.videoId),
      LikeStatus.create(schema.likeStatus),
    );
    return new LikeAggregate(likeEntity);
  }
  toPersistance(
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
