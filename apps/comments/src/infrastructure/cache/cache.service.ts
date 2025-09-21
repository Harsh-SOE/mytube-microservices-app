import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigService } from '../../config/config.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import { RedisWithCommentsOps } from '../../types';

@Injectable()
export class CommentsCacheService extends Redis implements OnModuleInit {
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
