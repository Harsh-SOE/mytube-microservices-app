import { AggregateRoot } from '@nestjs/cqrs';

export interface AggregateFactory<TCommandModel extends AggregateRoot> {
  create(...args: any): TCommandModel;
}
