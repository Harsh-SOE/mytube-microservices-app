import { AggregateRoot } from '@nestjs/cqrs';

import { DatabaseFilter } from '@app/infrastructure';

export interface IHubCommandRepository<
  TAggregate extends AggregateRoot,
  TPersistence,
> {
  createOne(domain: TAggregate): Promise<TAggregate>;

  createMany(domains: TAggregate[]): Promise<number>;

  loadOneAggregateById(id: string): Promise<TAggregate>;

  loadOneAggregate(filter: DatabaseFilter<TPersistence>): Promise<TAggregate>;

  loadManyAggregate(
    filter: DatabaseFilter<TPersistence>,
  ): Promise<TAggregate[]>;

  updateOneById(id: string, updates: TAggregate): Promise<TAggregate>;

  updateOne(
    filter: DatabaseFilter<TPersistence>,
    updates: TAggregate,
  ): Promise<TAggregate>;

  updateMany(
    filter: DatabaseFilter<TPersistence>,
    updates: TAggregate,
  ): Promise<number>;

  deleteOneById(id: string): Promise<boolean>;

  deleteOne(filter: DatabaseFilter<TPersistence>): Promise<boolean>;

  deleteMany(filter: DatabaseFilter<TPersistence>): Promise<number>;
}
