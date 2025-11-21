import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReactionResponse } from '@app/contracts/reaction';

import {
  CACHE_PORT,
  ReactionCachePort,
  BUFFER_PORT,
  ReactionBufferPort,
} from '@reaction/application/ports';
import { ReactionAggregate } from '@reaction/domain/aggregates';
import { GrpcDomainReactionStatusEnumMapper } from '@reaction/infrastructure/anti-corruption';

import { LikeCommand } from './like.command';

@CommandHandler(LikeCommand)
export class LikeCommandHandler
  implements ICommandHandler<LikeCommand, ReactionResponse>
{
  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: ReactionCachePort,
    @Inject(BUFFER_PORT) private readonly bufferAdapter: ReactionBufferPort,
  ) {}

  public async execute({
    videoLikeDto,
  }: LikeCommand): Promise<ReactionResponse> {
    const { userId, videoId, reaction } = videoLikeDto;

    const likeDomainStatus = GrpcDomainReactionStatusEnumMapper.get(reaction);

    // TODO: Implement Application level exceptions....
    if (!likeDomainStatus) {
      throw new Error();
    }

    const reactionAggregate = ReactionAggregate.create(
      userId,
      videoId,
      likeDomainStatus,
    );

    const res = await this.cacheAdapter.recordLike(videoId, userId);

    if (res !== 1) {
      return { response: `video was already liked by the current user` };
    }

    await this.bufferAdapter.bufferReaction(reactionAggregate);

    return { response: `video was liked successfully` };
  }
}
