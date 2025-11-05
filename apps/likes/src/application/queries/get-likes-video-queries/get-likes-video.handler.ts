import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { LikesFindCountForAVideoResponse } from '@app/contracts/likes';

import { CACHE_PORT, CachePort } from '@likes/application/ports';
import { getVideoLikesCounterKey } from '@likes/application/utils';

import { GetLikesVideoQuery } from './get-likes-video.queries';

@QueryHandler(GetLikesVideoQuery)
export class GetLikesVideoQueryHandler
  implements IQueryHandler<GetLikesVideoQuery, LikesFindCountForAVideoResponse>
{
  private readonly SHARDS = 64;

  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: CachePort,
  ) {}

  public async execute({
    likesFindCountForAVideoDto,
  }: GetLikesVideoQuery): Promise<LikesFindCountForAVideoResponse> {
    const { videoId } = likesFindCountForAVideoDto;

    const allShardedKeys = Array.from({ length: this.SHARDS }, (_, i) =>
      getVideoLikesCounterKey(videoId, i),
    );

    const values = await this.cacheAdapter.fetchManyFromCache(allShardedKeys);

    const totalLikes = values.reduce(
      (sum, currentValue) =>
        sum + (currentValue ? parseInt(currentValue, 10) : 0),
      0,
    );

    return { likes: totalLikes };
  }
}
