import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { LikesFindCountForAVideoResponse } from '@app/contracts/likes';

import { CACHE_PORT, LikeCachePort } from '@likes/application/ports';

import { GetLikesVideoQuery } from './get-likes-video.queries';

@QueryHandler(GetLikesVideoQuery)
export class GetLikesVideoQueryHandler
  implements IQueryHandler<GetLikesVideoQuery, LikesFindCountForAVideoResponse>
{
  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: LikeCachePort,
  ) {}

  public async execute({
    likesFindCountForAVideoDto,
  }: GetLikesVideoQuery): Promise<LikesFindCountForAVideoResponse> {
    const { videoId } = likesFindCountForAVideoDto;

    const totalLikes = await this.cacheAdapter.getTotalLikes(videoId);

    return { likes: totalLikes };
  }
}
