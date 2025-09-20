import { AggregateRoot } from '@nestjs/cqrs';
import { LikeDomainStatus } from '@likes-aggregator/domain/domain-enums';

export interface ILikeRepository<TAggregate extends AggregateRoot, TFilter> {
  interactVideo(model: TAggregate): Promise<TAggregate>;

  interactManyVideos(models: TAggregate[]): Promise<number>;

  changeLikeStatus(
    filter: TFilter,
    newLikeStatus: LikeDomainStatus,
  ): Promise<TAggregate>;

  changeManyLikeStatus(
    filter: TFilter,
    newLikeStatus: LikeDomainStatus,
  ): Promise<number>;
}
