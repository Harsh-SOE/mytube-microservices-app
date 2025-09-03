import { AggregateRoot } from '@nestjs/cqrs';

export interface IAggregateFactory<TCommandModel extends AggregateRoot> {
  create(...args: any): TCommandModel;
}
