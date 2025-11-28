import { Video } from '@peristance/videos';

import { VideoQueryModel } from '@videos/query';

import { DatabaseFilter, DatabaseQueryFilter } from './types';

export interface VideoQueryRepositoryPort {
  findOne(filter: DatabaseFilter<Video>): Promise<VideoQueryModel>;

  QueryVideos(
    filter: DatabaseFilter<Video>,
    queryOptions?: DatabaseQueryFilter<Video>,
  ): Promise<VideoQueryModel[]>;

  findOneByid(id: string): Promise<VideoQueryModel>;
}

export const DATABASE_QUERY_PORT = Symbol('DATABASE_PORT');
