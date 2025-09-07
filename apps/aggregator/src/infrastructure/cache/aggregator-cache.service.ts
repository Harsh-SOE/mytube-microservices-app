import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import winston from 'winston';
import Redis from 'ioredis';

import { KafkaLikeMessage, StreamData } from '@aggregator/types';
import { LikeAggregateFactory } from '@aggregator/domain/factories';
import { AppConfigService } from '@aggregator/config';

import { WINSTON_LOGGER } from '@app/clients';

import { LikeRepository } from '../repository';

@Injectable()
export class AggregatorCacheService extends Redis implements OnModuleInit {
  constructor(
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

  async onModuleInit() {
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

  public async bufferLikeMessages(message: KafkaLikeMessage) {
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

    for (const [stream, entries] of messages) {
      this.logger.log('cache', `Processing stream: ${stream}`);
      const messages: Array<{ id: string; likeMessages: KafkaLikeMessage[] }> =
        [];
      for (const [id, fields] of entries) {
        const likeMessages = this.formatMessage(fields);
        messages.push({ id, likeMessages: likeMessages });
      }
      await this.processMessage(messages);
    }
  }

  private formatMessage(fields: string[]): KafkaLikeMessage[] {
    const messages: KafkaLikeMessage[] = [];
    for (let i = 0; i < fields.length; i += 2) {
      const key = fields[i];
      const value = fields[i + 1];
      if (key === 'like-message') {
        try {
          messages.push(JSON.parse(value) as KafkaLikeMessage);
        } catch (error) {
          this.logger.log(
            'cache',
            `Failed to parse like-message: ${value}`,
            error,
          );
        }
      }
    }
    return messages;
  }

  async processMessage(
    messages: { id: string; likeMessages: KafkaLikeMessage[] }[],
  ) {
    try {
      const ids: string[] = [];
      const models = messages.map((message) => {
        ids.push(message.id);
        return message.likeMessages.map((likeMessage) => {
          const { likeStatus, userId, videoId } = likeMessage;
          return this.likeAggregateFactory.create(userId, videoId, likeStatus);
        });
      });
      const aggregates = models.flat();
      await this.likeRepo.interactManyVideos(aggregates);

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
