import { AggregateRoot } from '@nestjs/cqrs';

export interface IViewRepository<TAggregate extends AggregateRoot> {
  watchVideo(model: TAggregate): Promise<TAggregate>;

  watchVideosInBatches(models: TAggregate[]): Promise<number>;
}
