import { VideoLikes } from '@peristance/likes';

import { LikeAggregate } from '@likes/domain/aggregates';
import { LikeDomainStatus } from '@likes/domain/enums';
import { DatabaseFilter } from './types';

export interface LikeRepositoryPort {
  save(model: LikeAggregate): Promise<LikeAggregate>;

  saveMany(models: LikeAggregate[]): Promise<number>;

  update(
    filter: DatabaseFilter<VideoLikes>,
    newLikeStatus: LikeDomainStatus,
  ): Promise<LikeAggregate>;

  updateMany(
    filter: DatabaseFilter<VideoLikes>,
    newLikeStatus: LikeDomainStatus,
  ): Promise<number>;
}

export const DATABASE_PORT = Symbol('DATABASE_PORT');
