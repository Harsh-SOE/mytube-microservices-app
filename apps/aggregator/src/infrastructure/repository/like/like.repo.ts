import { LikeDomainStatus } from '@aggregator/domain/domain-enums';
import { AggregateRoot } from '@nestjs/cqrs';

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
