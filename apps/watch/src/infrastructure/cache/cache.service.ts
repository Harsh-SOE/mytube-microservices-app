import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFileSync } from 'fs';
import Redis from 'ioredis';
import { join } from 'path';

import { RedisWithWatchOperations } from '@watch/utils/types';

import { AppConfigService } from '../config';

@Injectable()
export class WatchCacheService extends Redis implements OnModuleInit {
  constructor(private configService: AppConfigService) {
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
    const watchVideoCounterIncrScript = readFileSync(
      join(__dirname, './scripts/watch.lua'),
      'utf-8',
    );

    this.defineCommand('WatchVideoCounterIncr', {
      numberOfKeys: 2,
      lua: watchVideoCounterIncrScript,
    });

    console.log('✅ Scripts intialized');
  }

  public async VideoWatchCounterIncr(
    userWatchSetKey: string,
    videoWatchCounterKey: string,
    userId: string,
  ): Promise<number> {
    type redisWithWatchOps = this & RedisWithWatchOperations;
    return await (
      this as redisWithWatchOps
    ).videoWatchCounterIncrScriptFunction(
      userWatchSetKey,
      videoWatchCounterKey,
      userId,
    );
  }
}
