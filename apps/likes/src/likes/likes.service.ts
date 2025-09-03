import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import winston from 'winston';
import Redis from 'ioredis';

import {
  DislikesFindCountForAVideoDto,
  DislikesFindCountForAVideoResponse,
  LikeFoundForVideoResponse,
  LikeModifiedStatusForVideoResponse,
  LikesFindCountForAVideoDto,
  LikesFindCountForAVideoResponse,
  LikesFindForUserForVideoDto,
  LikeStatus,
  ModifyLikeStatusForVideoDto,
} from '@app/contracts/likes';
import { getShardFor } from '@app/counters';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients';

@Injectable()
export class LikeService implements OnModuleInit {
  private static SHARDS = 64;

  constructor(
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
    @Inject('LIKES_CACHE_CLIENT')
    private readonly redis: Redis,
    @Inject(CLIENT_PROVIDER.AGGREGATOR)
    private readonly messageBroker: ClientKafka,
  ) {}

  private shardKey(videoId: string, userId: string, shard: number = 64) {
    return getShardFor(videoId + userId, shard);
  }

  private videoLikesCounterKey(videoId: string, shardNum: number) {
    return `vlc:${videoId}:${shardNum}`;
  }

  private videoDislikeCounterKey(videoId: string, shardNum: number) {
    return `vdc:${videoId}:${shardNum}`;
  }

  private userLikesSetKey(videoId: string) {
    return `vlu:${videoId}`;
  }

  private userDislikesSetKey(videoId: string) {
    return `vdu:${videoId}`;
  }

  async onModuleInit() {}

  async modifyVideoLikeStatus(
    modifyLikeStatusForVideoDto: ModifyLikeStatusForVideoDto,
  ): Promise<LikeModifiedStatusForVideoResponse> {
    const { likeStatus, userId, videoId } = modifyLikeStatusForVideoDto;
    const shardNum = this.shardKey(videoId, userId);
    const videoLikesSetKey = this.userLikesSetKey(videoId);
    const videoDislikesSetKey = this.userDislikesSetKey(videoId);
    const videoLikesCounterKey = this.videoLikesCounterKey(videoId, shardNum);
    const videoDislikeCounterKey = this.videoDislikeCounterKey(
      videoId,
      shardNum,
    );
    switch (true) {
      case likeStatus === LikeStatus.LIKE_STATUS_LIKE: {
        // like the video here...
        const res = await this.redis.videoLikesCountIncr(
          videoLikesSetKey,
          videoDislikesSetKey,
          videoLikesCounterKey,
          videoDislikeCounterKey,
          userId,
        );
        if (res === 1) {
          // video was liked successfully!
          // fire-and-forget event for durable aggregation
          this.messageBroker.emit('video.like', {
            videoId,
            userId,
            delta: +1,
            ts: Date.now(),
          });
          return { response: `video was liked successfully` };
        } else if (res === 0) {
          // video was already liked
          return { response: `video was already liked by the current user` };
        }
        break;
      }
      case likeStatus === LikeStatus.LIKE_STATUS_UNLIKE: {
        // unlike the video here...
        const res = await this.redis.videoLikesCountDecr(
          videoLikesSetKey,
          videoLikesCounterKey,
          userId,
        );
        if (res === 1) {
          // video was unliked successfully!
          // fire-and-forget event for durable aggregation
          this.messageBroker.emit('video.like', {
            videoId,
            userId,
            delta: -1,
            ts: Date.now(),
          });
          return { response: `video was unliked successfully` };
        } else if (res === 0) {
          // video was not liked by the user in the first place, so unlike cannot be performed...
          return {
            response: `video was not liked by the user in the first place, so unlike cannot be performed`,
          };
        }
        break;
      }
      case likeStatus === LikeStatus.LIKE_STATUS_DISLIKE: {
        // dislike video here
        const res = await this.redis.videoDislikesCountIncr(
          videoDislikesSetKey,
          videoLikesSetKey,
          videoDislikeCounterKey,
          videoLikesCounterKey,
          userId,
        );
        if (res === 1) {
          // video was disliked successfully!
          // fire-and-forget event for durable aggregation
          this.messageBroker.emit('video.dislike', {
            videoId,
            userId,
            delta: +1,
            ts: Date.now(),
          });
          return { response: `video was disliked successfully` };
        } else if (res === 0) {
          // video was already disliked by the user
          return {
            response: `video was already disliked by the user`,
          };
        }
        break;
      }
      case likeStatus === LikeStatus.LIKE_STATUS_UNDISLIKE: {
        // unlike the video here
        const res = await this.redis.videoDislikesCountDecr(
          videoDislikesSetKey,
          videoDislikeCounterKey,
          userId,
        );
        if (res === 1) {
          // video was disliked successfully!
          // fire-and-forget event for durable aggregation
          this.messageBroker.emit('video.dislike', {
            videoId,
            userId,
            delta: -1,
            ts: Date.now(),
          });
          return { response: `video was undisliked successfully` };
        } else if (res === 0) {
          // video was not disliked by the user in the first place, so undislike cannot be performed...
          return {
            response: `video was already disliked by the uvideo was not disliked by the user in the first place, so undislike cannot be performedser`,
          };
        }
        break;
      }
      default: {
        return { response: 'invalid like status was provided' };
      }
    }
    return { response: 'something went wrong' };
  }

  async getLikesCountForVideo(
    likesFindCountForAVideoDto: LikesFindCountForAVideoDto,
  ): Promise<LikesFindCountForAVideoResponse> {
    const { videoId } = likesFindCountForAVideoDto;
    const allShardedKeys = Array.from({ length: LikeService.SHARDS }, (_, i) =>
      this.videoLikesCounterKey(videoId, i),
    );
    const values = await this.redis.mget(...allShardedKeys);
    const totalLikes = values.reduce(
      (sum, currentValue) =>
        sum + (currentValue ? parseInt(currentValue, 10) : 0),
      0,
    );
    return { likes: totalLikes };
  }

  async getDislikesCountForVideo(
    dislikesFindCountForAVideoDto: DislikesFindCountForAVideoDto,
  ): Promise<DislikesFindCountForAVideoResponse> {
    const { videoId } = dislikesFindCountForAVideoDto;
    const allShardedKeys = Array.from({ length: LikeService.SHARDS }, (_, i) =>
      this.videoDislikeCounterKey(videoId, i),
    );
    const values = await this.redis.mget(...allShardedKeys);
    const totalDislikes = values.reduce(
      (sum, currentValue) =>
        sum + (currentValue ? parseInt(currentValue, 10) : 0),
      0,
    );
    return { dislikes: totalDislikes };
  }

  async findLikeForUserForVideo(
    likesFindAllForVideoDto: LikesFindForUserForVideoDto,
  ): Promise<LikeFoundForVideoResponse> {
    const { videoId, userId } = likesFindAllForVideoDto;
    await Promise.resolve(null);

    // delegate to aggregaor service for querying the like
    return { id: 'random-id', likeStatus: 0, userId, videoId };
  }
}
