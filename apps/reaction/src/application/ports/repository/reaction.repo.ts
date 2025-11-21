import { VideoReactions } from '@peristance/reaction';

import { ReactionAggregate } from '@reaction/domain/aggregates';
import { ReactionDomainStatus } from '@reaction/domain/enums';

import { DatabaseFilter } from './types';

export interface ReactionRepositoryPort {
  save(model: ReactionAggregate): Promise<ReactionAggregate>;

  saveMany(models: ReactionAggregate[]): Promise<number>;

  update(
    filter: DatabaseFilter<VideoReactions>,
    newLikeStatus: ReactionDomainStatus,
  ): Promise<ReactionAggregate>;

  updateMany(
    filter: DatabaseFilter<VideoReactions>,
    newLikeStatus: ReactionDomainStatus,
  ): Promise<number>;
}

export const DATABASE_PORT = Symbol('DATABASE_PORT');
