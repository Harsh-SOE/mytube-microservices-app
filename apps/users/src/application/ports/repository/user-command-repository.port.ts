import { User } from '@peristance/user';

import { UserAggregate } from '@users/domain/aggregates';

import { DatabaseFilter } from './types';

export interface UserCommandRepositoryPort {
  save(domain: UserAggregate): Promise<UserAggregate>;

  saveMany(domains: UserAggregate[]): Promise<number>;

  findOneById(id: string): Promise<UserAggregate>;

  findOne(filter: DatabaseFilter<User>): Promise<UserAggregate>;

  findMany(filter: DatabaseFilter<User>): Promise<UserAggregate[]>;

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
