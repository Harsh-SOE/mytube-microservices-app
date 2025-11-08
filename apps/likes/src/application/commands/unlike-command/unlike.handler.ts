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

import { UnlikeCommand } from './unlike.command';

@CommandHandler(UnlikeCommand)
export class UnlikeCommandHandler
  implements ICommandHandler<UnlikeCommand, LikeActionResponse>
{
  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: LikeCachePort,
    @Inject(BUFFER_PORT) private readonly bufferAdapter: BufferPort,
  ) {}

  public async execute({
    videoLikeDto,
  }: UnlikeCommand): Promise<LikeActionResponse> {
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

    const res = await this.cacheAdapter.removeLike(videoId, userId);

    if (res !== 1) {
      return {
        response: `video was not liked by the user in the first place, so unlike cannot be performed`,
      };
    }

    await this.bufferAdapter.bufferLike(likesAggregate);

    return { response: `video was unliked successfully` };
  }
}
