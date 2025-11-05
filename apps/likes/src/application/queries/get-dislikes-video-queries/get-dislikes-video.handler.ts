import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DislikesFindCountForAVideoResponse } from '@app/contracts/likes';

import { CACHE_PORT, CachePort } from '@likes/application/ports';
import { getVideoDislikeCounterKey } from '@likes/application/utils';

import { GetDislikesVideoQuery } from './get-dislikes-video.queries';

@QueryHandler(GetDislikesVideoQuery)
export class GetDislikesVideoQueryHandler
  implements
    IQueryHandler<GetDislikesVideoQuery, DislikesFindCountForAVideoResponse>
{
  private readonly SHARDS = 64;

  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: CachePort,
  ) {}

  public async execute({
    dislikesFindCountForAVideoDto,
  }: GetDislikesVideoQuery): Promise<DislikesFindCountForAVideoResponse> {
    const { videoId } = dislikesFindCountForAVideoDto;

    const allShardedKeys = Array.from({ length: this.SHARDS }, (_, i) =>
      getVideoDislikeCounterKey(videoId, i),
    );

    const values = await this.cacheAdapter.fetchManyFromCache(allShardedKeys);

    const totalDislikes = values.reduce(
      (sum, currentValue) =>
        sum + (currentValue ? parseInt(currentValue, 10) : 0),
      0,
    );
    return { dislikes: totalDislikes };
  }
}
