import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { FindVideoQuery } from './find-video.query';
import { VideoFoundResponse } from '@app/contracts/videos';
import { VideoQueryRepository } from '@videos/infrastructure/repository';

@QueryHandler(FindVideoQuery)
export class FindVideoHandler implements ICommandHandler<FindVideoQuery> {
  constructor(private readonly video: VideoQueryRepository) {}

  async execute({ videoFindDto }: FindVideoQuery): Promise<VideoFoundResponse> {
    const { id } = videoFindDto;
    return await this.video.findOneByid(id);
  }
}
