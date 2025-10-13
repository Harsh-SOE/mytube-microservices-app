import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { readFileSync } from 'fs';
import { join } from 'path';

import { RedisWithCommentsOps } from '@comments/types';
import { AppConfigService } from '@comments/infrastructure/config';

@Injectable()
export class CommentsCacheService extends Redis implements OnModuleInit {
  /**
   * Creates a new instance of the CommentsCacheService.
   * @param {AppConfigService} configService - The application configuration service.
   * @constructor
   */
  public constructor(configService: AppConfigService) {
    super({
      host: configService.CACHE_HOST,
      port: configService.CACHE_PORT,
    });

    this.on('connecting', () => {
      console.log(`Redis connecting`);
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

  /**
   * Initialize the Redis connection and define the 'commentVideo' command.
   * The 'commentVideo' command increments the comment count for a user and video.
   * It takes two parameters: the user's comment set key and the comment counter key.
   * The script is loaded from the './scripts/comments.lua' file.
   */
  onModuleInit() {
    const commentVideoScript = readFileSync(
      join(__dirname, './scripts/comments.lua'),
      'utf-8',
    );

    this.defineCommand('commentVideo', {
      numberOfKeys: 2,
      lua: commentVideoScript,
    });

    console.log('✅ Scripts intialized');
  }

  /**
   * Increment the comment count for a user and video.
   * @param userCommentSetKey the user's comment set key
   * @param userCommentCounterKey the comment counter key
   * @param userId the user's id
   * @returns the number of comments
   */
  async commentVideoCounterIncr(
    userCommentSetKey: string,
    userCommentCounterKey: string,
    userId: string,
  ): Promise<number> {
    type redisWithCommentOps = this & RedisWithCommentsOps;
    return await (this as redisWithCommentOps).commentVideo(
      userCommentSetKey,
      userCommentCounterKey,
      userId,
    );
  }
}
