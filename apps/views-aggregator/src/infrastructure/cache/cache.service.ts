import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

import { AppConfigService } from '@views-aggregator/config';
import { ViewAggregateFactory } from '@views-aggregator/domain/factories';
import { StreamData, WatchMessage } from '@views-aggregator/types';

import { ViewRepository } from '../repository';

@Injectable()
export class ViewAggregatorCacheService extends Redis implements OnModuleInit {
  constructor(
    private readonly configService: AppConfigService,
    private readonly viewRepo: ViewRepository,
    private readonly viewAggregateFactory: ViewAggregateFactory,
  ) {
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

  async onModuleInit() {
    try {
      await this.xgroup(
        'CREATE',
        this.configService.WATCH_STREAM_KEY,
        this.configService.WATCH_STREAM_GROUP_NAME,
        '0',
        'MKSTREAM',
      );
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('BUSYGROUP')) {
        console.warn(`Stream already exists, skipping creation`);
      } else {
        console.error(err);
        throw err;
      }
    }

    setInterval(() => {
      this.processBufferedWatchMessages('consumer-1').catch((error) =>
        console.log('Error in consumer:', error),
      );
    }, 30000);
  }

  async bufferWatchMessage(message: WatchMessage) {
    // add to stream in order to buffer it
    await this.xadd(
      this.configService.WATCH_STREAM_KEY,
      '*',
      'watch-message',
      JSON.stringify(message),
    );
  }

  async processBufferedWatchMessages(streamConsumerName: string) {
    const messagesInStream = (await this.xreadgroup(
      'GROUP',
      this.configService.WATCH_STREAM_GROUP_NAME,
      streamConsumerName,
      'COUNT',
      10,
      'BLOCK',
      5000,
      'STREAMS',
      this.configService.WATCH_STREAM_KEY,
      '>',
    )) as StreamData[];

    if (!messagesInStream || messagesInStream.length === 0) return;

    await this.extractMessageFromStream(messagesInStream);
  }

  async extractMessageFromStream(stream: StreamData[]) {
    const messageAsWatchMessagesArray: WatchMessage[] = [];
    for (const [streamKey, entries] of stream) {
      console.log(`Processing values for ${streamKey} stream`);
      for (const [id, messageKeyValueObjectArray] of entries) {
        console.log(`Got an element with id:${id}`);
        messageAsWatchMessagesArray.push(
          JSON.parse(messageKeyValueObjectArray[1]) as WatchMessage,
        );
      }
    }
    console.log(`Messages: ${JSON.stringify(messageAsWatchMessagesArray)}`);
    await this.processMessages(messageAsWatchMessagesArray);
  }

  async processMessages(messages: WatchMessage[]) {
    const viewAggregates = messages.map((message) =>
      this.viewAggregateFactory.create(message.userId, message.videoId),
    );
    return await this.viewRepo.watchVideosInBatches(viewAggregates);
  }
}
