import { Inject, Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@nestjs/cqrs';

import {
  DislikesFindCountForAVideoDto,
  DislikesFindCountForAVideoResponse,
  LikeActionResponse,
  LikeFoundForVideoResponse,
  LikesFindCountForAVideoDto,
  LikesFindCountForAVideoResponse,
  LikesFindForUserForVideoDto,
  ReactionType,
  VideoLikeActionDto,
} from '@app/contracts/likes';

import { LOGGER_PORT, LoggerPort } from '@likes/application/ports';
import {
  DislikeCommand,
  LikeCommand,
  UnDislikeCommand,
  UnlikeCommand,
} from '@likes/application/commands';
import {
  GetDislikesVideoQuery,
  GetLikesVideoQuery,
} from '@likes/application/queries';

@Injectable()
export class LikeService {
  public static readonly SHARDS = 64;

  public constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {}

  public async videoLikeAction(
    videoLikeActionDto: VideoLikeActionDto,
  ): Promise<LikeActionResponse> {
    const { reaction } = videoLikeActionDto;

    switch (true) {
      case reaction === ReactionType.REACTION_LIKE: {
        return this.commandBus.execute<LikeCommand, LikeActionResponse>(
          new LikeCommand(videoLikeActionDto),
        );
      }
      case reaction === ReactionType.REACTION_UNLIKE: {
        return this.commandBus.execute<UnlikeCommand, LikeActionResponse>(
          new UnlikeCommand(videoLikeActionDto),
        );
      }
      case reaction === ReactionType.REACTION_DISLIKE: {
        return this.commandBus.execute<DislikeCommand, LikeActionResponse>(
          new DislikeCommand(videoLikeActionDto),
        );
      }
      case reaction === ReactionType.REACTION_UNDISLIKE: {
        return this.commandBus.execute<UnDislikeCommand, LikeActionResponse>(
          new UnDislikeCommand(videoLikeActionDto),
        );
      }
      default: {
        return { response: 'invalid like status was provided' };
      }
    }
  }

  public async getLikesCountForVideo(
    likesFindCountForAVideoDto: LikesFindCountForAVideoDto,
  ): Promise<LikesFindCountForAVideoResponse> {
    return await this.queryBus.execute<
      GetLikesVideoQuery,
      LikesFindCountForAVideoResponse
    >(new GetLikesVideoQuery(likesFindCountForAVideoDto));
  }

  async getDislikesCountForVideo(
    dislikesFindCountForAVideoDto: DislikesFindCountForAVideoDto,
  ): Promise<DislikesFindCountForAVideoResponse> {
    return await this.queryBus.execute<
      GetDislikesVideoQuery,
      DislikesFindCountForAVideoResponse
    >(new GetDislikesVideoQuery(dislikesFindCountForAVideoDto));
  }

  async findLikeForUserForVideo(
    likesFindAllForVideoDto: LikesFindForUserForVideoDto,
  ): Promise<LikeFoundForVideoResponse> {
    const { videoId, userId } = likesFindAllForVideoDto;
    await Promise.resolve(null);

    // delegate to aggregaor service for querying the like
    return { id: 'random-id', reaction: 0, userId, videoId };
  }
}
