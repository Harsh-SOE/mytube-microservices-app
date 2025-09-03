import { AggregateRoot } from '@nestjs/cqrs';
import { LikeEntity } from '../../entities/like/like.entity';

export class LikeAggregate extends AggregateRoot {
  public constructor(private likeEntity: LikeEntity) {
    super();
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
