import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigService } from '../config/config.service';
import { CommentMessage, StreamData } from '../../types';
import { CommentAggregateFactory } from '../../domain/factories';
import { CommentRepo } from '../repository/comment.repo.impl';

@Injectable()
export class CommentAggregatorCacheService
  extends Redis
  implements OnModuleInit
{
  public constructor(
    private configService: AppConfigService,
    private commentRepository: CommentRepo,
    private commentAggregateFactory: CommentAggregateFactory,
  ) {
    super({
      host: configService.CACHE_SERVICE_HOST,
      port: configService.CACHE_SERVICE_PORT,
    });

    this.on('connecting', () => console.log(`Redis connecting...`));
    this.on('connect', () => console.log(`Redis connected`));
    this.on('error', (error) =>
      console.error(`An error occured while connecting to redis: ${error}`),
    );
  }

  async onModuleInit() {
    try {
      await this.xgroup(
        'CREATE',
        this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_KEY,
        this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_GROUPNAME,
        '0',
        'MKSTREAM',
      );
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('BUSYGROUP')) {
        console.warn(
          `Stream with key: ${this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_KEY} already exists, skipping creation`,
        );
      } else {
        throw err;
      }
    }
  }

  async bufferCommentMessage(message: CommentMessage) {
    await this.xadd(
      this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_KEY,
      '*',
      'comment-message',
      JSON.stringify(message),
    );
  }

  async processBufferedMessages(consumerGroupName: string): Promise<number> {
    const streamData = (await this.xreadgroup(
      'GROUP',
      this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_GROUPNAME,
      consumerGroupName,
      'COUNT',
      10,
      'BLOCK',
      5000,
      'STREAMS',
      this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_KEY,
      '>',
    )) as StreamData[];

    if (!streamData || streamData.length === 0) {
      return 0;
    }

    const { ids, extractedMessages } =
      this.extractMessageFromStream(streamData);

    return await this.processMessages(ids, extractedMessages);
  }

  extractMessageFromStream(stream: StreamData[]) {
    const messages: CommentMessage[] = [];
    const ids: string[] = [];
    for (const [streamKey, entities] of stream) {
      console.log(`Processing stream: ${streamKey}`);
      for (const [id, message] of entities) {
        console.log(`Recieved an element with id:${id}`);
        ids.push(id);
        messages.push(JSON.parse(message[1]) as CommentMessage);
      }
    }
    return { ids: ids, extractedMessages: messages };
  }

  async processMessages(ids: string[], messages: CommentMessage[]) {
    const models = messages.map((message) =>
      this.commentAggregateFactory.create(
        message.userId,
        message.videoId,
        message.commentText,
      ),
    );
    const processedMessagesNumber =
      await this.commentRepository.saveManyComments(models);

    await this.xack(
      this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_KEY,
      this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_GROUPNAME,
      ...ids,
    );

    return processedMessagesNumber;
  }
}
