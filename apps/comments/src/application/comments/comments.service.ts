import {
  CommentVideoDto,
  CommentVideoResponse,
} from '@app/contracts/comments/comments';
import { Inject, Injectable } from '@nestjs/common';
import { CommentsCacheService } from '../../infrastructure/cache/cache.service';
import { getShardFor } from '@app/counters';
import { CLIENT_PROVIDER } from '@app/clients';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CommentsService {
  public constructor(
    private cacheService: CommentsCacheService,
    @Inject(CLIENT_PROVIDER.COMMENTS_AGGREGATOR)
    private commentsAggregator: ClientKafka,
  ) {}

  public getUserCommentedVideoSetKey(videoId: string) {
    return `vcu:${videoId}`;
  }

  public getCommentsCountKey(videoId: string) {
    return `vcc:${videoId}`;
  }

  public gerShard(userId: string, videoId: string, shardNum = 64) {
    return getShardFor(userId + videoId, shardNum);
  }

  public async commentOnVideo(
    commentVideoDto: CommentVideoDto,
  ): Promise<CommentVideoResponse> {
    const { userId, videoId, comment } = commentVideoDto;

    const userCommentSetKey = this.getUserCommentedVideoSetKey(videoId);
    const userCommentCounterKey = this.getCommentsCountKey(videoId);

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
