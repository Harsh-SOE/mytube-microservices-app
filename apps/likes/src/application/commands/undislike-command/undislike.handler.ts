import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LikeActionResponse } from '@app/contracts/likes';

import {
  CACHE_PORT,
  LikeCachePort,
  BUFFER_PORT,
  BufferPort,
} from '@likes/application/ports';
import { LikeAggregate } from '@likes/domain/aggregates';
import { GrpcDomainLikeStatusEnumMapper } from '@likes/infrastructure/anti-corruption';

import { UnDislikeCommand } from './undislike.command';

@CommandHandler(UnDislikeCommand)
export class UnDislikeCommandHandler
  implements ICommandHandler<UnDislikeCommand, LikeActionResponse>
{
  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: LikeCachePort,
    @Inject(BUFFER_PORT) private readonly bufferAdapter: BufferPort,
  ) {}

  public async execute({
    videoLikeDto,
  }: UnDislikeCommand): Promise<LikeActionResponse> {
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

    const res = await this.cacheAdapter.removeDislike(videoId, userId);

    if (res !== 1) {
      return { response: `video was already liked by the current user` };
    }

    await this.bufferAdapter.bufferLike(likesAggregate);

    return { response: `video was undisliked successfully` };
  }
}
