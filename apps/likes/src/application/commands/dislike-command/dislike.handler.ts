import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LikeActionResponse } from '@app/contracts/likes';

import {
  CACHE_PORT,
  CachePort,
  BUFFER_PORT,
  BufferPort,
} from '@likes/application/ports';
import {
  getShardKey,
  getUserDislikesSetKey,
  getUserLikesSetKey,
  getVideoDislikeCounterKey,
  getVideoLikesCounterKey,
} from '@likes/application/utils';
import { LikeAggregate } from '@likes/domain/aggregates';
import { GrpcDomainLikeStatusEnumMapper } from '@likes/infrastructure/anti-corruption';

import { DislikeCommand } from './dislike.command';

@CommandHandler(DislikeCommand)
export class DislikeCommandHandler
  implements ICommandHandler<DislikeCommand, LikeActionResponse>
{
  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: CachePort,
    @Inject(BUFFER_PORT) private readonly bufferAdapter: BufferPort,
  ) {}

  public async execute({
    videoLikeDto,
  }: DislikeCommand): Promise<LikeActionResponse> {
    const { userId, videoId, reaction } = videoLikeDto;

    const likeDomainStatus = GrpcDomainLikeStatusEnumMapper.get(reaction);

    if (!likeDomainStatus) {
      throw new Error();
    }

    const likesAggregate = LikeAggregate.create(
      userId,
      videoId,
      likeDomainStatus,
    );

    const shardNum = getShardKey(videoId, userId);
    const videoLikesSetKey = getUserLikesSetKey(videoId);
    const videoDislikesSetKey = getUserDislikesSetKey(videoId);
    const videoLikesCounterKey = getVideoLikesCounterKey(videoId, shardNum);
    const videoDislikeCounterKey = getVideoDislikeCounterKey(videoId, shardNum);

    const res = await this.cacheAdapter.videoDislikesCountIncr(
      videoDislikesSetKey,
      videoLikesSetKey,
      videoDislikeCounterKey,
      videoLikesCounterKey,
      userId,
    );

    if (res !== 1) {
      return { response: `video was already disliked by the user` };
    }

    await this.bufferAdapter.bufferLike(likesAggregate);

    return { response: `video was disliked successfully` };
  }
}
