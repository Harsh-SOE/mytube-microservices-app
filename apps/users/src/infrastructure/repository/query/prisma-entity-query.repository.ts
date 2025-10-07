import { DatabaseFilter } from '@app/infrastructure';

export interface IUserQueryRepository<TPersistence, TQueryModel> {
  findById(id: string): Promise<TQueryModel>;

  findOne(filter: DatabaseFilter<TPersistence>): Promise<TQueryModel>;

  findMany(filter: DatabaseFilter<TPersistence>): Promise<TQueryModel[]>;
}
