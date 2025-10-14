import { DatabaseFilter } from '@app/infrastructure';
import { HubAggregate } from '@hub/domain/aggregates';
import { Hub } from '@peristance/hub';

export interface HubCommandRepositoryPort {
  save(domain: HubAggregate): Promise<HubAggregate>;

  saveMany(domains: HubAggregate[]): Promise<number>;

  loadOneAggregateById(id: string): Promise<HubAggregate>;

  loadOneAggregate(filter: DatabaseFilter<Hub>): Promise<HubAggregate>;

  loadManyAggregate(filter: DatabaseFilter<Hub>): Promise<HubAggregate[]>;

  updateOneById(id: string, updates: HubAggregate): Promise<HubAggregate>;

  updateOne(
    filter: DatabaseFilter<Hub>,
    updates: HubAggregate,
  ): Promise<HubAggregate>;

  updateMany(
    filter: DatabaseFilter<Hub>,
    updates: HubAggregate,
  ): Promise<number>;

  deleteOneById(id: string): Promise<boolean>;

  deleteOne(filter: DatabaseFilter<Hub>): Promise<boolean>;

  deleteMany(filter: DatabaseFilter<Hub>): Promise<number>;
}

export const HUB_COMMAND_REPOSITORY = Symbol('HUB_COMMAND_REPOSITORY');
