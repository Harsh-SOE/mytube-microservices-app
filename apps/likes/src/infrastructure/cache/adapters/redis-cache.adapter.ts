import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';
import * as fs from 'fs';
import { join } from 'path';

import { AppConfigService } from '@likes/infrastructure/config';
import {
  CachePort,
  CacheSetoptions,
  LOGGER_PORT,
  LoggerPort,
} from '@likes/application/ports';

import { RedisFilter } from '../filters';
import { RedisWithCommands } from '../types';

@Injectable()
export class RedisCacheAdapter
  implements OnModuleInit, OnModuleDestroy, CachePort
{
  private redisClient: RedisWithCommands;

  constructor(
    private readonly configService: AppConfigService,
    private readonly redisfilter: RedisFilter,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {
    this.redisClient = new Redis({
      host: configService.CACHE_HOST,
      port: configService.CACHE_PORT,
    }) as RedisWithCommands;

    this.redisClient.on('connecting', () => {
      this.logger.info('Redis connecting...');
    });
    this.redisClient.on('connect', () => {
      this.logger.info('✅ Redis connected');
    });
    this.redisClient.on('error', (error) => {
      this.logger.error('❌ An Error occured in redis...', error);
    });
  }

  onModuleInit() {
    const likeScript = fs.readFileSync(
      join(__dirname, './scripts/like.lua'),
      'utf8',
    );

    this.redisClient.defineCommand('videoLikesCountIncr', {
      numberOfKeys: 4,
      lua: likeScript,
    });

    const unlikeScript = fs.readFileSync(
      join(__dirname, './scripts/unlike.lua'),
      'utf8',
    );

    this.redisClient.defineCommand('videoLikesCountDecr', {
      numberOfKeys: 2,
      lua: unlikeScript,
    });

    const dislikeScript = fs.readFileSync(
      join(__dirname, './scripts/dislike.lua'),
      'utf8',
    );

    this.redisClient.defineCommand('videoDislikesCountIncr', {
      numberOfKeys: 4,
      lua: dislikeScript,
    });

    const undislikeScript = fs.readFileSync(
      join(__dirname, './scripts/undislike.lua'),
      'utf8',
    );

    this.redisClient.defineCommand('videoDislikesCountDecr', {
      numberOfKeys: 2,
      lua: undislikeScript,
    });

    console.log('✅ Scripts intialized');
  }

  onModuleDestroy() {
    this.redisClient.disconnect();
  }

  async saveInCache(
    key: string,
    value: string,
    options: CacheSetoptions,
  ): Promise<'OK'> {
    const { setTTL, TTL } = options;

    const redisCacheSetOperation = async () => {
      return setTTL
        ? this.redisClient.set(key, value, 'PX', TTL)
        : this.redisClient.set(key, value);
    };

    await this.redisfilter.filter(redisCacheSetOperation, {
      operationType: 'WRITE',
      key,
      value,
      logErrors: true,
      suppressErrors: false,
    });
    return 'OK';
  }

  async saveManyInCache(
    keyValues: Record<string, string>,
    options: CacheSetoptions,
  ): Promise<'OK'> {
    const redisPipeline = this.redisClient.pipeline();
    for (const [key, value] of Object.entries(keyValues)) {
      if (options.setTTL) {
        redisPipeline.set(key, value, 'PX', options.TTL);
      } else {
        redisPipeline.set(key, value);
      }
    }
    await this.redisfilter.filter(async () => await redisPipeline.exec(), {
      operationType: 'WRITE_MANY',
      keys: Object.keys(keyValues),
      values: Object.values(keyValues),
      logErrors: true,
      suppressErrors: false,
    });
    return 'OK';
  }

  async fetchFromCache(key: string): Promise<string | null> {
    const redisCacheGetOperation = async () => await this.redisClient.get(key);
    return await this.redisfilter.filter(redisCacheGetOperation, {
      key,
      operationType: 'READ',
      logErrors: true,
      suppressErrors: false,
    });
  }

  async fetchManyFromCache(keys: string[]): Promise<Array<string | null>> {
    return await this.redisfilter.filter(
      async () => await this.redisClient.mget(...keys),
      {
        operationType: 'READ_MANY',
        keys,
        logErrors: true,
        suppressErrors: false,
      },
    );
  }

  async deleteFromCache(key: string): Promise<'DELETED'> {
    const redisCacheDeleteOperation = async () =>
      await this.redisClient.del(key);
    await this.redisfilter.filter(redisCacheDeleteOperation, {
      key,
      operationType: 'DELETE',
      logErrors: true,
      suppressErrors: false,
    });
    return 'DELETED';
  }

  async videoLikesCountIncr(
    usersLikedSetKey: string,
    usersDislikedSetKey: string,
    videoLikeCounterKey: string,
    videoDislikeCounterKey: string,
    userId: string,
  ): Promise<number> {
    return await this.redisClient.videoLikesCountIncrScriptFunction(
      usersLikedSetKey,
      usersDislikedSetKey,
      videoLikeCounterKey,
      videoDislikeCounterKey,
      userId,
    );
  }

  async videoLikesCountDecr(
    usersLikedSetKey: string,
    videoLikeCounterKey: string,
    userId: string,
  ): Promise<number> {
    return await this.redisClient.videoLikesCountDecrScriptFunction(
      usersLikedSetKey,
      videoLikeCounterKey,
      userId,
    );
  }

  async videoDislikesCountIncr(
    usersDislikedSetKey: string,
    usersLikedSetKey: string,
    videoDislikeCounterKey: string,
    videoLikeCounterKey: string,
    userId: string,
  ): Promise<number> {
    return await this.redisClient.videoDislikesCountIncrScriptFunction(
      usersDislikedSetKey,
      usersLikedSetKey,
      videoDislikeCounterKey,
      videoLikeCounterKey,
      userId,
    );
  }

  async videoDislikesCountDecr(
    usersDislikedSetKey: string,
    videoDislikeCounterKey: string,
    userId: string,
  ): Promise<number> {
    return await this.redisClient.videoDislikesCountDecrScriptFunction(
      usersDislikedSetKey,
      videoDislikeCounterKey,
      userId,
    );
  }
}
