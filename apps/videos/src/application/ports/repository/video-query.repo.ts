import { Video } from '@peristance/videos';

import { VideoQueryModel } from '@videos/query';

import { DatabaseFilter } from './types';

export interface VideoQueryRepositoryPort {
  findOne(filter: DatabaseFilter<Video>): Promise<VideoQueryModel>;

  findMany(filter: DatabaseFilter<Video>): Promise<VideoQueryModel[]>;

  findOneByid(id: string): Promise<VideoQueryModel>;
}

export const DATABASE_QUERY_PORT = Symbol('DATABASE_PORT');
