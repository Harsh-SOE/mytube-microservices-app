import { AggregateRoot } from '@nestjs/cqrs';

import { DatabaseFilter } from '../types';

export interface ICommandRepository<
  TAggregate extends AggregateRoot,
  TPersistanceSchema,
> {
  createOne(domain: TAggregate): Promise<TAggregate>;

  createMany(domains: TAggregate[]): Promise<number>;

  updateOne(
    filter: DatabaseFilter<TPersistanceSchema>,
    updatedDomain: TAggregate,
  ): Promise<TAggregate>;

  updateOneById(id: string, updatedDomain: TAggregate): Promise<TAggregate>;

  updateMany(
    filter: DatabaseFilter<TPersistanceSchema>,
    updatedDomains: TAggregate,
  ): Promise<TAggregate[]>;

  findOneById(id: string): Promise<TAggregate>;

  deleteOne(filter: DatabaseFilter<TPersistanceSchema>): Promise<boolean>;

  deleteOnebyId(id: string): Promise<boolean>;

  deleteMany(filter: DatabaseFilter<TPersistanceSchema>): Promise<boolean>;
}
