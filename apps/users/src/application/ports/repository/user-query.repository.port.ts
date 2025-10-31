import { DatabaseFilter } from '@app/infrastructure';

export interface UserQueryRepositoryPort<TPersistence, TQueryModel> {
  findById(id: string): Promise<TQueryModel>;

  findOne(filter: DatabaseFilter<TPersistence>): Promise<TQueryModel>;

  findMany(filter: DatabaseFilter<TPersistence>): Promise<TQueryModel[]>;
}

export const USER_QUERY_REROSITORY = Symbol('USER_QUERY_REROSITORY');
