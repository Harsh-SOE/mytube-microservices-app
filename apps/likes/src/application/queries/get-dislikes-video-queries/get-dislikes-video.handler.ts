import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DislikesFindCountForAVideoResponse } from '@app/contracts/likes';

import { CACHE_PORT, LikeCachePort } from '@likes/application/ports';

import { GetDislikesVideoQuery } from './get-dislikes-video.queries';

@QueryHandler(GetDislikesVideoQuery)
export class GetDislikesVideoQueryHandler
  implements
    IQueryHandler<GetDislikesVideoQuery, DislikesFindCountForAVideoResponse>
{
  private readonly SHARDS = 64;

  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: LikeCachePort,
  ) {}

  public async execute({
    dislikesFindCountForAVideoDto,
  }: GetDislikesVideoQuery): Promise<DislikesFindCountForAVideoResponse> {
    const { videoId } = dislikesFindCountForAVideoDto;

    const totalDislikes = await this.cacheAdapter.getTotalDislikes(videoId);

    return { dislikes: totalDislikes };
  }
}
