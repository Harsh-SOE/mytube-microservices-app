import { DatabaseFilter } from '@app/infrastructure';

import { HubQueryModel } from '@hub/application/query';

import { Hub } from '@peristance/hub';

export interface HubQueryRepositoryPort {
  findById(id: string): Promise<HubQueryModel>;

  findOne(filter: DatabaseFilter<Hub>): Promise<HubQueryModel>;

  findMany(filter: DatabaseFilter<Hub>): Promise<HubQueryModel[]>;
}

export const HUB_QUERY_REPOSITORY = Symbol('HUB_QUERY_REPOSITORY');
