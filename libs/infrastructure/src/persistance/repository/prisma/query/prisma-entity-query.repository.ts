import { DatabaseFilter } from '../types';

export interface IQueryRepository<TPersistanceSchema, TQueryModel> {
  findOne(filter: DatabaseFilter<TPersistanceSchema>): Promise<TQueryModel>;

  findMany(filter: DatabaseFilter<TPersistanceSchema>): Promise<TQueryModel[]>;

  findOneByid(id: string): Promise<TQueryModel>;
}
