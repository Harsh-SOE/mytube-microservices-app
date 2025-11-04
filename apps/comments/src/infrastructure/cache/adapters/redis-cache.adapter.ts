import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { readFileSync } from 'fs';
import { join } from 'path';

import { AppConfigService } from '@comments/infrastructure/config';
import { CachePort, CacheSetoptions } from '@comments/application/ports';

import { RedisWithCommands } from '../types';
import { RedisFilter } from '../filters';

@Injectable()
export class RedisCacheAdapter implements CachePort, OnModuleInit {
  private redisClient: RedisWithCommands;

  public constructor(
    configService: AppConfigService,
    private readonly handler: RedisFilter,
  ) {
    this.redisClient = new Redis({
      host: configService.CACHE_HOST,
      port: configService.CACHE_PORT,
    }) as RedisWithCommands;

    this.redisClient.on('connecting', () => {
      console.log(`Redis connecting`);
    });

    this.redisClient.on('connect', () => {
      console.log('✅ Redis connected');
    });

    this.redisClient.on('error', (error) => {
      console.log('❌ Redis error:', error);
    });
  }

  onModuleInit() {
    const commentVideoScript = readFileSync(
      join(__dirname, './scripts/comments.lua'),
      'utf-8',
    );

    this.redisClient.defineCommand('commentVideo', {
      numberOfKeys: 2,
      lua: commentVideoScript,
    });

    console.log('✅ Scripts intialized');
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

    await this.handler.filter(redisCacheSetOperation, {
      key,
      value,
      operationType: 'WRITE',
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
    await redisPipeline.exec();
    return 'OK';
  }

  async fetchFromCache(key: string): Promise<string | null> {
    const redisCacheGetOperation = async () => await this.redisClient.get(key);
    return await this.handler.filter(redisCacheGetOperation, {
      key,
      operationType: 'READ',
      logErrors: true,
      suppressErrors: false,
    });
  }

  async fetchManyFromCache(keys: string[]): Promise<Array<string | null>> {
    return await this.redisClient.mget(...keys);
  }

  async deleteFromCache(key: string): Promise<'DELETED'> {
    const redisCacheDeleteOperation = async () =>
      await this.redisClient.del(key);
    await this.handler.filter(redisCacheDeleteOperation, {
      key,
      operationType: 'DELETE',
      logErrors: true,
      suppressErrors: false,
    });
    return 'DELETED';
  }

  async incrementCommentCounter(
    userCommentSetKey: string,
    userCommentCounterKey: string,
    userId: string,
  ): Promise<number | null> {
    const operation = async () =>
      await this.redisClient.commentVideo(
        userCommentSetKey,
        userCommentCounterKey,
        userId,
      );

    return await this.handler.filter(operation, {
      key: userCommentCounterKey,
      value: '+1',
      operationType: 'WRITE',
      logErrors: true,
      suppressErrors: false,
    });
  }
}
