import { DatabaseFilter } from '@app/infrastructure';
import { User } from '@peristance/user';
import { UserAggregate } from '@users/domain/aggregates';

export interface UserCommandRepositoryPort {
  createOne(domain: UserAggregate): Promise<UserAggregate>;

  createMany(domains: UserAggregate[]): Promise<number>;

  loadOneAggregateById(id: string): Promise<UserAggregate>;

  loadOneAggregate(filter: DatabaseFilter<User>): Promise<UserAggregate>;

  loadManyAggregate(filter: DatabaseFilter<User>): Promise<UserAggregate[]>;

  updateOneById(id: string, updates: UserAggregate): Promise<UserAggregate>;

  updateOne(
    filter: DatabaseFilter<User>,
    updates: UserAggregate,
  ): Promise<UserAggregate>;

  updateMany(
    filter: DatabaseFilter<User>,
    updates: UserAggregate,
  ): Promise<number>;

  deleteOneById(id: string): Promise<boolean>;

  deleteOne(filter: DatabaseFilter<User>): Promise<boolean>;

  deleteMany(filter: DatabaseFilter<User>): Promise<number>;

  markAsOnboarded(id: string): Promise<UserAggregate>;
}

export const USER_COMMAND_REROSITORY = Symbol('USER_COMMAND_REROSITORY');
