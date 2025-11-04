import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

import { LikeAggregate } from '@likes/domain/aggregates';
import { AppConfigService } from '@likes/infrastructure/config';
import {
  BufferPort,
  DATABASE_PORT,
  LikeRepositoryPort,
  LOGGER_PORT,
  LoggerPort,
} from '@likes/application/ports';
import { GrpcDomainLikeStatusEnumMapper } from '@likes/infrastructure/anti-corruption';

import { LikeMessage, StreamData } from '../types';

@Injectable()
export class RedisStreamBufferAdapter implements BufferPort, OnModuleInit {
  private redisClient: Redis;

  public constructor(
    private readonly configService: AppConfigService,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
    @Inject(DATABASE_PORT) private readonly likesRepo: LikeRepositoryPort,
  ) {
    this.redisClient = new Redis({
      host: configService.CACHE_HOST,
      port: configService.CACHE_PORT,
    });

    this.redisClient.on('connecting', () => {
      this.logger.info(`Redis connecting`);
    });

    this.redisClient.on('connect', () => {
      this.logger.info('✅ Redis connected');
    });

    this.redisClient.on('error', (error) => {
      this.logger.info('❌ Error occured while connecting to redis', error);
    });
  }

  async onModuleInit() {
    try {
      await this.redisClient.xgroup(
        'CREATE',
        this.configService.LIKE_STREAM_KEY,
        this.configService.LIKE_STREAM_GROUPNAME,
        '0',
        'MKSTREAM',
      );
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('BUSYGROUP')) {
        console.warn(
          `Stream with key: ${this.configService.LIKE_STREAM_KEY} already exists, skipping creation`,
        );
      } else {
        throw err;
      }
    }
  }

  async bufferLike(like: LikeAggregate): Promise<void> {
    await this.redisClient.xadd(
      this.configService.LIKE_STREAM_KEY,
      '*',
      'like-message',
      JSON.stringify(like.getEntity().getSnapshot()),
    );
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async processLikesBatch() {
    const streamData = (await this.redisClient.xreadgroup(
      'GROUP',
      this.configService.LIKE_STREAM_GROUPNAME,
      'like-consumer',
      'COUNT',
      10,
      'BLOCK',
      5000,
      'STREAMS',
      this.configService.LIKE_STREAM_KEY,
      '>',
    )) as StreamData[];

    if (!streamData || streamData.length === 0) {
      return 0;
    }

    const { ids, extractedMessages } =
      this.extractMessageFromStream(streamData);

    return await this.processMessages(ids, extractedMessages);
  }

  public extractMessageFromStream(stream: StreamData[]) {
    const messages: LikeMessage[] = [];
    const ids: string[] = [];
    for (const [streamKey, entities] of stream) {
      console.log(`Processing stream: ${streamKey}`);
      for (const [id, message] of entities) {
        console.log(`Recieved an element with id:${id}`);
        ids.push(id);
        messages.push(JSON.parse(message[1]) as LikeMessage);
      }
    }
    return { ids: ids, extractedMessages: messages };
  }

  async processMessages(ids: string[], messages: LikeMessage[]) {
    const models = messages.map((message) => {
      const likeStatus = GrpcDomainLikeStatusEnumMapper.get(message.likeStatus);
      if (!likeStatus) throw new Error();
      return LikeAggregate.create(message.userId, message.videoId, likeStatus);
    });

    const processedMessagesNumber = await this.likesRepo.saveMany(models);

    await this.redisClient.xack(
      this.configService.LIKE_STREAM_KEY,
      this.configService.LIKE_STREAM_GROUPNAME,
      ...ids,
    );

    return processedMessagesNumber;
  }
}
