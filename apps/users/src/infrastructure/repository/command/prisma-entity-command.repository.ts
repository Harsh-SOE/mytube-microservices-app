import { AggregateRoot } from '@nestjs/cqrs';

import { DatabaseFilter } from '@app/infrastructure';

export interface IUserCommandRepository<
  TAggregate extends AggregateRoot,
  TPersistance,
> {
  userSignup(domain: TAggregate): Promise<TAggregate>;

  manyUsersSignup(domains: TAggregate[]): Promise<number>;

  updateOneUserDetails(
    filter: DatabaseFilter<TPersistance>,
    updatedDomain: TAggregate,
  ): Promise<TAggregate>;

  updateOneUserDetailsById(
    id: string,
    updatedDomain: TAggregate,
  ): Promise<TAggregate>;

  updateManyUsersDetails(
    filter: DatabaseFilter<TPersistance>,
    updatedDomains: TAggregate,
  ): Promise<TAggregate[]>;

  findOneUserById(id: string): Promise<TAggregate>;

  findOneUser(filter: DatabaseFilter<TPersistance>): Promise<TAggregate>;

  deleteOneUser(filter: DatabaseFilter<TPersistance>): Promise<boolean>;

  deleteOneUserbyId(id: string): Promise<boolean>;

  deleteManyUsers(filter: DatabaseFilter<TPersistance>): Promise<boolean>;
}
