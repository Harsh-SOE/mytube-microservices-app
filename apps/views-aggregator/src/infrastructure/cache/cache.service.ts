import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

import { AppConfigService } from '@views-aggregator/config';
import { ViewAggregateFactory } from '@views-aggregator/domain/factories';
import { StreamData, WatchMessage } from '@views-aggregator/types';

import { ViewRepository } from '../repository';

@Injectable()
export class ViewAggregatorCacheService extends Redis implements OnModuleInit {
  public constructor(
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

  public async onModuleInit() {
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

  public async bufferWatchMessage(message: WatchMessage) {
    // add to stream in order to buffer it
    await this.xadd(
      this.configService.WATCH_STREAM_KEY,
      '*',
      'watch-message',
      JSON.stringify(message),
    );
  }

  private async processBufferedWatchMessages(streamConsumerName: string) {
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

    const { ids, extractedMessages } =
      this.extractMessageFromStream(messagesInStream);
    return await this.processMessages(ids, extractedMessages);
  }

  private extractMessageFromStream(stream: StreamData[]) {
    const messages: WatchMessage[] = [];
    const ids: string[] = [];
    for (const [streamKey, entries] of stream) {
      console.log(`Processing values for ${streamKey} stream`);
      for (const [id, values] of entries) {
        console.log(`Got an element with id:${id}`);
        ids.push(id);
        messages.push(JSON.parse(values[1]) as WatchMessage);
      }
    }
    return { ids: ids, extractedMessages: messages };
  }

  private async processMessages(ids: string[], messages: WatchMessage[]) {
    const viewAggregates = messages.map((message) =>
      this.viewAggregateFactory.create(message.userId, message.videoId),
    );

    await this.viewRepo.watchVideosInBatches(viewAggregates);

    await this.xack(
      this.configService.WATCH_STREAM_KEY,
      this.configService.WATCH_STREAM_GROUP_NAME,
      ...ids,
    );
  }
}
