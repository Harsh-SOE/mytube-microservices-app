import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import {
  CommentVideoDto,
  CommentVideoResponse,
} from '@app/contracts/comments/comments';
import { getShardFor } from '@app/counters';
import { CLIENT_PROVIDER } from '@app/clients';

import { CommentsCacheService } from '@comments/infrastructure/cache';

@Injectable()
export class CommentsService {
  public constructor(
    private cacheService: CommentsCacheService,
    @Inject(CLIENT_PROVIDER.COMMENTS_AGGREGATOR)
    private commentsAggregator: ClientKafka,
  ) {}

  /**
   * Generates a cache SET key for storing users that have commented on a video with the given id.
   *
   * @param videoId - The id of the video
   * @returns A cache SET key in the format "video_comments_users_set:{videoId}"
   */
  public getUserCommentedVideoSetKey(videoId: string) {
    return `video_comments_users_set:${videoId}`;
  }

  /**
   * Generates a cache key for storing the count of comments on a video with the given id.
   *
   * @param videoId - The id of the video
   * @returns A cache key in the format "video_comments_counter:{videoId}"
   */
  public getCommentsCountKey(videoId: string, shardNum: number) {
    return `video_comments_counter:${videoId}:${shardNum}`;
  }

  /**
   * Generates a shard number based on the given userId and videoId.
   * The shard number is calculated by concatenating the userId and videoId, and then
   * taking the modulus of the resulting string with the given shard number.
   * If shardNum is not provided, it defaults to 64.
   *
   * @param userId - The user id
   * @param videoId - The video id
   * @param shardNum - The shard number (defaults to 64)
   * @returns The shard number
   */
  public getShard(userId: string, videoId: string, shardNum = 64) {
    return getShardFor(userId + videoId, shardNum);
  }

  /**
   * Comments on a video
   *
   * @param commentVideoDto - The request object containing the user id, video id and comment text
   * @returns A promise that resolves to a CommentVideoResponse object
   * @throws {Promise<CommentVideoResponse>}
   */
  public async commentOnVideo(
    commentVideoDto: CommentVideoDto,
  ): Promise<CommentVideoResponse> {
    const { userId, videoId, comment } = commentVideoDto;

    const shardNum = this.getShard(userId, videoId);
    const userCommentSetKey = this.getUserCommentedVideoSetKey(videoId);
    const userCommentCounterKey = this.getCommentsCountKey(videoId, shardNum);

    const result = await this.cacheService.commentVideoCounterIncr(
      userCommentSetKey,
      userCommentCounterKey,
      userId,
    );

    console.log(userCommentSetKey, userCommentCounterKey, userId);

    if (result === 0) {
      return { response: 'already commented' };
    }

    this.commentsAggregator.emit('video.comment', {
      userId,
      videoId,
      commentText: comment,
    });

    return { response: `Commented on video: ${videoId}` };
  }
}
