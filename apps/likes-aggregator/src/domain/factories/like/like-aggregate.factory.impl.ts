import { LikeAggregate } from '@likes-aggregator/domain/aggregates';
import { IAggregateFactory } from './aggregate.factory';
import { LikeEntity } from '@likes-aggregator/domain/entities';
import {
  LikeStatus,
  UserId,
  VideoId,
} from '@likes-aggregator/domain/value-objects';
import { Injectable } from '@nestjs/common';
import { GrpcDomainLikeStatusEnumMapper } from '@likes-aggregator/infrastructure/anti-corruption';
import { LikeTransportStatus } from '@app/contracts/likes';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LikeAggregateFactory implements IAggregateFactory<LikeAggregate> {
  create(
    userId: string,
    videoId: string,
    likeStatus: LikeTransportStatus,
  ): LikeAggregate {
    const videoLikeStatus = GrpcDomainLikeStatusEnumMapper.get(likeStatus);
    if (videoLikeStatus === undefined) {
      throw new Error(`Invalid Like status`);
    }

    const likeEntity = new LikeEntity(
      uuidv4(),
      UserId.create(userId),
      VideoId.create(videoId),
      LikeStatus.create(videoLikeStatus),
    );
    return new LikeAggregate(likeEntity);
  }
}
