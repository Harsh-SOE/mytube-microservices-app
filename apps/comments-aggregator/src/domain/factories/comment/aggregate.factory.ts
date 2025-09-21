import { AggregateRoot } from '@nestjs/cqrs';

export interface IAggregateFactory<TModel extends AggregateRoot> {
  create(...args: any): TModel;
}
