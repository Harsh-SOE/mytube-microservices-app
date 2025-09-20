import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import winston from 'winston';
import Redis from 'ioredis';

import { LikeMessage, StreamData } from '@likes-aggregator/types';
import { LikeAggregateFactory } from '@likes-aggregator/domain/factories';
import { AppConfigService } from '@likes-aggregator/config';

import { WINSTON_LOGGER } from '@app/clients';

import { LikeRepository } from '../repository';

@Injectable()
export class AggregatorCacheService extends Redis implements OnModuleInit {
  public constructor(
    private readonly configService: AppConfigService,
    private likeRepo: LikeRepository,
    private likeAggregateFactory: LikeAggregateFactory,
    @Inject(WINSTON_LOGGER) private logger: winston.Logger,
  ) {
    super({ host: configService.CACHE_HOST, port: configService.CACHE_PORT });
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

  public async onModuleInit() {
    // create the stream if it does not exists
    try {
      await this.xgroup(
        'CREATE',
        this.configService.CACHE_STREAM_KEY,
        this.configService.CACHE_STREAM_GROUP_NAME,
        '0',
        'MKSTREAM',
      );
      this.logger.info('cache', 'STREAM WAS CREATED!!!');
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('BUSYGROUP')) {
        this.logger.log(
          'cache',
          'Consumer group already exists, skipping creation',
        );
      } else {
        this.logger.log('cache', 'Failed to create consumer group', err);
        throw err;
      }
    }
    setInterval(() => {
      this.processBufferedLikeMessages('consumer-1').catch((err) => {
        this.logger.log('info', 'Error in consumer:', err);
      });
    }, 30000);
  }

  public async bufferLikeMessages(message: LikeMessage) {
    await this.xadd(
      this.configService.CACHE_STREAM_KEY,
      '*', // this will auto-generate ID for each redis message in the stream
      'like-message',
      JSON.stringify(message),
    );
  }

  public async processBufferedLikeMessages(consumerGroupName: string) {
    const messages = (await this.xreadgroup(
      'GROUP',
      this.configService.CACHE_STREAM_GROUP_NAME,
      consumerGroupName,
      'COUNT',
      10,
      'BLOCK',
      5000,
      'STREAMS',
      this.configService.CACHE_STREAM_KEY,
      '>',
    )) as StreamData[];

    if (!messages || !messages.length) return;

    this.logger.log(
      'cache',
      `these message will be saved in database`,
      messages,
    );

    const { ids, extractedMessages } = this.extractMessageFromStream(messages);
    await this.processMessages(ids, extractedMessages);
  }

  private extractMessageFromStream(stream: StreamData[]) {
    const messages: LikeMessage[] = [];
    const ids: string[] = [];
    for (const [streamKey, entries] of stream) {
      console.log(`Processing ${streamKey} stream`);
      for (const [id, values] of entries) {
        console.log(`Recieved element with id:${id}`);
        ids.push(id);
        messages.push(JSON.parse(values[1]) as LikeMessage);
      }
    }
    return { ids: ids, extractedMessages: messages };
  }

  private async processMessages(ids: string[], messages: LikeMessage[]) {
    try {
      const models = messages.map((message) => {
        return this.likeAggregateFactory.create(
          message.userId,
          message.videoId,
          message.likeStatus,
        );
      });
      await this.likeRepo.interactManyVideos(models);

      this.logger.log(
        'cache',
        `These messages will be acknowledged: ${ids.join(', ')}`,
      );
      await this.xack(
        this.configService.CACHE_STREAM_KEY,
        this.configService.CACHE_STREAM_GROUP_NAME,
        ...ids,
      );
    } catch (error) {
      this.logger.log('cache', 'Failed to process message', error);
      // INFO: Optionally retry later, or leave it for another consumer
    }
  }
}
