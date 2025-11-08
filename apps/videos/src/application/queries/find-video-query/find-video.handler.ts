import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { VideoFoundResponse } from '@app/contracts/videos';

import { VideoQueryRepositoryAdapter } from '@videos/infrastructure/repository/adapters';

import { FindVideoQuery } from './find-video.query';

@QueryHandler(FindVideoQuery)
export class FindVideoHandler implements IQueryHandler<FindVideoQuery> {
  constructor(private readonly video: VideoQueryRepositoryAdapter) {}

  async execute({ videoFindDto }: FindVideoQuery): Promise<VideoFoundResponse> {
    const { id } = videoFindDto;
    return await this.video.findOneByid(id);
  }
}
