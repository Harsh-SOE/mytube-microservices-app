import { ViewAggregate } from '@views/domain/aggregates';

export interface ViewRepositoryPort {
  save(model: ViewAggregate): Promise<ViewAggregate>;

  saveMany(models: ViewAggregate[]): Promise<number>;
}

export const DATABASE_PORT = Symbol('DATABASE_PORT');
