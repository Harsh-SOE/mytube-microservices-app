import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { getShardFor } from '@app/counters';
import { CommentVideoResponse } from '@app/contracts/comments';

import {
  BUFFER_PORT,
  BufferPort,
  CACHE_PORT,
  CachePort,
} from '@comments/application/ports';
import { CommentAggregate } from '@comments/domain/aggregates';

import { CreateCommentCommand } from './create-comment.command';

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler
  implements ICommandHandler<CreateCommentCommand, CommentVideoResponse>
{
  constructor(
    @Inject(BUFFER_PORT) private buffer: BufferPort,
    @Inject(CACHE_PORT) private cache: CachePort,
  ) {}

  public getUserCommentedVideoSetKey(videoId: string) {
    return `video_comments_users_set:${videoId}`;
  }

  public getCommentsCountKey(videoId: string, shardNum: number) {
    return `video_comments_counter:${videoId}:${shardNum}`;
  }

  public getShard(userId: string, videoId: string, shardNum = 64) {
    return getShardFor(userId + videoId, shardNum);
  }

  async execute({
    createCommentDto,
  }: CreateCommentCommand): Promise<CommentVideoResponse> {
    const { comment, userId, videoId } = createCommentDto;

    const commentAggregate = CommentAggregate.create(userId, videoId, comment);

    const shardNum = this.getShard(userId, videoId);
    const userCommentSetKey = this.getUserCommentedVideoSetKey(videoId);
    const userCommentCounterKey = this.getCommentsCountKey(videoId, shardNum);

    const result = await this.cache.incrementCommentCounter(
      userCommentSetKey,
      userCommentCounterKey,
      userId,
    );

    if (result === 0) {
      return { response: 'already commented' };
    }

    await this.buffer.bufferComment(commentAggregate);

    return { response: `Commented on video: ${videoId}` };
  }
}
