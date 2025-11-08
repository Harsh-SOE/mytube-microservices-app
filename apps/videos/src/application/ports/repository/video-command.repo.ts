import { Video } from '@peristance/videos';

import { VideoAggregate } from '@videos/domain/aggregates';
import {
  VideoDomainPublishStatus,
  VideoDomainVisibiltyStatus,
} from '@videos/domain/enums';

import { DatabaseFilter } from './types';

export interface VideoCommandRepositoryPort {
  save(model: VideoAggregate): Promise<VideoAggregate>;

  saveMany(models: VideoAggregate[]): Promise<number>;

  updatePublishStatus(
    filter: DatabaseFilter<Video>,
    newPublishStatus: VideoDomainPublishStatus,
  ): Promise<VideoAggregate>;

  updateVisibilityStatus(
    filter: DatabaseFilter<Video>,
    newPublishStatus: VideoDomainVisibiltyStatus,
  ): Promise<VideoAggregate>;

  updateOne(
    filter: DatabaseFilter<Video>,
    newVideoModel: VideoAggregate,
  ): Promise<VideoAggregate>;

  updateOneById(
    id: string,
    newVideoModel: VideoAggregate,
  ): Promise<VideoAggregate>;

  updateMany(
    filter: DatabaseFilter<Video>,
    newVideoModel: VideoAggregate,
  ): Promise<number>;

  findOneById(id: string): Promise<VideoAggregate>;
}

export const DATABASE_COMMAND_PORT = Symbol('DATABASE_PORT');
