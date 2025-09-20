import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { WatchVideoDto, WatchVideoResponse } from '@app/contracts/watch';
import { getShardFor } from '@app/counters';

import { WatchCacheService } from '@watch/infrastructure/cache';

@Injectable()
export class WatchService {
  constructor(
    private cacheService: WatchCacheService,
    private viewAggregatorClient: ClientKafka,
  ) {}

  private getShard(videoId: string, userId: string, shard: number = 64) {
    return getShardFor(videoId + userId, shard);
  }

  private videoWatchedByUserSetKey(videoId: string) {
    return `vwu:${videoId}`;
  }

  private videoWatchCounterKey(videoId: string, shardNum: number) {
    return `vwc:${videoId}:${shardNum}`;
  }

  public async watchVideo(
    watchVideoDto: WatchVideoDto,
  ): Promise<WatchVideoResponse> {
    const { userId, videoId } = watchVideoDto;
    const userWatchedVideoSetKey = this.videoWatchedByUserSetKey(videoId);
    const shardNum = this.getShard(videoId, userId);
    const videoWatchCounterKey = this.videoWatchCounterKey(videoId, shardNum);

    await this.cacheService.VideoWatchCounterIncr(
      userWatchedVideoSetKey,
      videoWatchCounterKey,
      userId,
    );

    this.viewAggregatorClient.emit('video.watched', watchVideoDto);

    return { response: 'video watched successfully' };
  }
}
