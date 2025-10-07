import { DatabaseFilter } from '@app/infrastructure';

export interface IHubQueryRepository<TPersistence, TQueryModel> {
  findById(id: string): Promise<TQueryModel>;

  findOne(filter: DatabaseFilter<TPersistence>): Promise<TQueryModel>;

  findMany(filter: DatabaseFilter<TPersistence>): Promise<TQueryModel[]>;
}
