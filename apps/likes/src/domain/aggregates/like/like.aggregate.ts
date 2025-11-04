import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { LikeStatus, UserId, VideoId } from '@likes/domain/value-objects';
import { LikeDomainStatus } from '@likes/domain/enums';

import { LikeEntity } from '../../entities/like/like.entity';

export class LikeAggregate extends AggregateRoot {
  public constructor(private readonly likeEntity: LikeEntity) {
    super();
  }

  public static create(
    userId: string,
    videoId: string,
    likeStatus: LikeDomainStatus,
  ) {
    const likeEntity = new LikeEntity(
      uuidv4(),
      UserId.create(userId),
      VideoId.create(videoId),
      LikeStatus.create(likeStatus),
    );
    return new LikeAggregate(likeEntity);
  }

  public getSnapshot() {
    return this.likeEntity.getSnapshot();
  }

  public getEntity() {
    return this.likeEntity;
  }

  public updateLikeStatus(newLikeStatus: string) {
    return this.likeEntity.updateLikeStatus(newLikeStatus);
  }
}
