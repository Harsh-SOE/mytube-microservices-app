import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

import { CommentAggregate } from '@comments/domain/aggregates';
import { AppConfigService } from '@comments/infrastructure/config';
import { BufferPort, CommentRepositoryPort } from '@comments/application/ports';

import { CommentMessage, StreamData } from '../types';

@Injectable()
export class RedisStreamBufferAdapter implements BufferPort, OnModuleInit {
  private redisClient: Redis;

  public constructor(
    private readonly configService: AppConfigService,
    private readonly commentsRepo: CommentRepositoryPort,
  ) {
    this.redisClient = new Redis({
      host: configService.CACHE_HOST,
      port: configService.CACHE_PORT,
    });

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

  async onModuleInit() {
    try {
      await this.redisClient.xgroup(
        'CREATE',
        this.configService.COMMENT_STREAM_KEY,
        this.configService.COMMENT_STREAM_GROUPNAME,
        '0',
        'MKSTREAM',
      );
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('BUSYGROUP')) {
        console.warn(
          `Stream with key: ${this.configService.COMMENT_STREAM_KEY} already exists, skipping creation`,
        );
      } else {
        throw err;
      }
    }
  }

  async bufferComment(comment: CommentAggregate): Promise<void> {
    await this.redisClient.xadd(
      this.configService.COMMENT_STREAM_KEY,
      '*',
      'comment-message',
      JSON.stringify(comment.getComment().getSnapshot()),
    );
  }

  async processCommentsBatch() {
    const streamData = (await this.redisClient.xreadgroup(
      'GROUP',
      this.configService.COMMENT_STREAM_GROUPNAME,
      'comment-consumer',
      'COUNT',
      10,
      'BLOCK',
      5000,
      'STREAMS',
      this.configService.COMMENT_STREAM_KEY,
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
      CommentAggregate.create(
        message.userId,
        message.videoId,
        message.commentText,
      ),
    );
    const processedMessagesNumber =
      await this.commentsRepo.saveManyComments(models);

    await this.redisClient.xack(
      this.configService.COMMENT_STREAM_KEY,
      this.configService.COMMENT_STREAM_GROUPNAME,
      ...ids,
    );

    return processedMessagesNumber;
  }
}
