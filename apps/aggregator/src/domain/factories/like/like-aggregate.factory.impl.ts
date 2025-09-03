import { LikeAggregate } from '@aggregator/domain/aggregates';
import { IAggregateFactory } from './aggregate.factory';
import { LikeEntity } from '@aggregator/domain/entities';
import { LikeStatus, UserId, VideoId } from '@aggregator/domain/value-objects';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeAggregateFactory implements IAggregateFactory<LikeAggregate> {
  create(
    id: string,
    userId: string,
    videoId: string,
    likeStatus: string,
  ): LikeAggregate {
    const likeEntity = new LikeEntity(
      id,
      UserId.create(userId),
      VideoId.create(videoId),
      LikeStatus.create(likeStatus),
    );
    return new LikeAggregate(likeEntity);
  }
}
