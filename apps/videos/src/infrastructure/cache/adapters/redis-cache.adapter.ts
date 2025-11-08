/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';

import {
  VideoCachePort,
  LOGGER_PORT,
  LoggerPort,
} from '@videos/application/ports';
import { AppConfigService } from '@videos/infrastructure/config';

import { RedisFilter } from '../filters';

@Injectable()
export class RedisCacheAdapter
  implements OnModuleInit, OnModuleDestroy, VideoCachePort
{
  private readonly SHARDS: number = 64;
  private redisClient: Redis;

  public constructor(
    private readonly configService: AppConfigService,
    private readonly redisfilter: RedisFilter,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {
    this.redisClient = new Redis({
      host: configService.CACHE_HOST,
      port: configService.CACHE_PORT,
    });

    this.redisClient.on('connecting', () => {
      this.logger.info('⏳ Redis connecting...');
    });
    this.redisClient.on('connect', () => {
      this.logger.info('✅ Redis connected');
    });
    this.redisClient.on('error', (error) => {
      this.logger.error('❌ An Error occured in redis cache', error);
    });
  }

  public async onModuleInit() {
    await this.redisClient.connect();
  }

  public onModuleDestroy() {
    this.redisClient.disconnect();
  }

  cacheVideo(videoId: string, userId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
  getVideo(videoId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
