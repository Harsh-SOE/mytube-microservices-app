import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReactionDislikeCountVideoResponse } from '@app/contracts/reaction';

import { CACHE_PORT, ReactionCachePort } from '@reaction/application/ports';

import { GetDislikesVideoQuery } from './get-dislikes-video.queries';

@QueryHandler(GetDislikesVideoQuery)
export class GetDislikesVideoQueryHandler
  implements
    IQueryHandler<GetDislikesVideoQuery, ReactionDislikeCountVideoResponse>
{
  private readonly SHARDS = 64;

  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: ReactionCachePort,
  ) {}

  public async execute({
    reactionDislikeCountVideoDto,
  }: GetDislikesVideoQuery): Promise<ReactionDislikeCountVideoResponse> {
    const { videoId } = reactionDislikeCountVideoDto;

    const totalDislikes = await this.cacheAdapter.getTotalDislikes(videoId);

    return { dislikes: totalDislikes };
  }
}
