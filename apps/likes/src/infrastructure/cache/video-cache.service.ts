import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import * as fs from 'fs';
import { join } from 'path';

import { AppConfigService } from '@likes/config';

import { RedisLikesOperations } from '@likes/utils/types';

@Injectable()
export class VideoCacheService extends Redis implements OnModuleInit {
  constructor(configService: AppConfigService) {
    super({
      host: configService.CACHE_HOST,
      port: configService.CACHE_PORT,
    });
    this.on('connecting', () => {
      console.log('Redis connecting...');
    });
    this.on('connect', () => {
      console.log('✅ Redis connected');
    });
    this.on('error', (error) => {
      console.log('❌ Redis error:', error);
    });
  }
  onModuleInit() {
    const likeScript = fs.readFileSync(
      join(__dirname, './scripts/like.lua'),
      'utf8',
    );

    this.defineCommand('videoLikesCountIncr', {
      numberOfKeys: 4,
      lua: likeScript,
    });

    const unlikeScript = fs.readFileSync(
      join(__dirname, './scripts/unlike.lua'),
      'utf8',
    );

    this.defineCommand('videoLikesCountDecr', {
      numberOfKeys: 2,
      lua: unlikeScript,
    });

    const dislikeScript = fs.readFileSync(
      join(__dirname, './scripts/dislike.lua'),
      'utf8',
    );

    this.defineCommand('videoDislikesCountIncr', {
      numberOfKeys: 4,
      lua: dislikeScript,
    });

    const undislikeScript = fs.readFileSync(
      join(__dirname, './scripts/undislike.lua'),
      'utf8',
    );

    this.defineCommand('videoDislikesCountDecr', {
      numberOfKeys: 2,
      lua: undislikeScript,
    });

    console.log('✅ Scripts intialized');
  }

  async videoLikesCountIncr(
    usersLikedSetKey: string, // liked by user set key
    usersDislikedSetKey: string, // disliked by user set key
    videoLikeCounterKey: string, // video likes counter key
    videoDislikeCounterKey: string, // video dislikes counter key
    userId: string,
  ): Promise<number> {
    type redisWithLikesOps = this & RedisLikesOperations;
    return await (this as redisWithLikesOps).videoLikesCountIncrScriptFunction(
      usersLikedSetKey,
      usersDislikedSetKey,
      videoLikeCounterKey,
      videoDislikeCounterKey,
      userId,
    );
  }

  async videoLikesCountDecr(
    usersLikedSetKey: string, // liked by user set key
    videoLikeCounterKey: string, // video likes counter key
    userId: string,
  ): Promise<number> {
    type redisWithLikesOps = this & RedisLikesOperations;
    return await (this as redisWithLikesOps).videoLikesCountDecrScriptFunction(
      usersLikedSetKey,
      videoLikeCounterKey,
      userId,
    );
  }

  async videoDislikesCountIncr(
    usersDislikedSetKey: string, // disliked by user set key
    usersLikedSetKey: string, // liked by user set key
    videoDislikeCounterKey: string, // video disliked counter key
    videoLikeCounterKey: string, // video liked counter key
    userId: string,
  ): Promise<number> {
    type redisWithLikesOps = this & RedisLikesOperations;
    return await (
      this as redisWithLikesOps
    ).videoDislikesCountIncrScriptFunction(
      usersDislikedSetKey,
      usersLikedSetKey,
      videoDislikeCounterKey,
      videoLikeCounterKey,
      userId,
    );
  }

  async videoDislikesCountDecr(
    usersDislikedSetKey: string, // liked by users set key
    videoDislikeCounterKey: string, // video disliked counter key
    userId: string,
  ): Promise<number> {
    type redisWithLikesOps = this & RedisLikesOperations;
    return await (
      this as redisWithLikesOps
    ).videoDislikesCountDecrScriptFunction(
      usersDislikedSetKey,
      videoDislikeCounterKey,
      userId,
    );
  }
}
