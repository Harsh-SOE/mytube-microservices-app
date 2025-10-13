import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { VideoFoundResponse } from '@app/contracts/videos';

import { VideoQueryRepository } from '@videos/infrastructure/repository';

import { FindVideoQuery } from './find-video.query';

@QueryHandler(FindVideoQuery)
export class FindVideoHandler implements IQueryHandler<FindVideoQuery> {
  constructor(private readonly video: VideoQueryRepository) {}

  async execute({ videoFindDto }: FindVideoQuery): Promise<VideoFoundResponse> {
    const { id } = videoFindDto;
    return await this.video.findOneByid(id);
  }
}
