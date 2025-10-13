import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

import { CommentAggregate } from '@comments-aggregator/domain/aggregates';
import { AppConfigService } from '@comments-aggregator/infrastructure/config';
import { CommentMessage, StreamData } from '@comments-aggregator/types';
import {
  COMMENT_REPOSITORY,
  CommentRepositoryPort,
} from '@comments-aggregator/application/ports';

@Injectable()
export class CommentAggregatorCacheService
  extends Redis
  implements OnModuleInit
{
  /**
   * Constructor for CommentAggregatorCacheService.
   * It initializes the Redis connection and logs the events of connecting, connection established and errors.
   * @param {AppConfigService} configService - The configuration service.
   * @param {CommentRepositoryPort} commentRepository - The comment repository.
   */
  public constructor(
    private configService: AppConfigService,
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: CommentRepositoryPort,
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

  /**
   * This method is called when the module is initialized.
   * It creates a redis stream if it does not already exist.
   * If the stream already exists, it logs a warning message and skips creation.
   * If an error occurs while creating the stream, it logs the error and throws it.
   */
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

  /**
   * Buffers a comment message in a redis stream.
   * This method is used to save comment messages in a redis stream before they are processed.
   * The stream is configured in the AppConfigService.
   * @param {CommentMessage} message - The comment message to be buffered.
   * @returns {Promise<number>} - A promise that resolves with the number of messages buffered.
   */
  async bufferCommentMessage(message: CommentMessage) {
    await this.xadd(
      this.configService.COMMENT_AGGREGATOR_CACHE_STREAM_KEY,
      '*',
      'comment-message',
      JSON.stringify(message),
    );
  }

  /**
   * Process buffered comment messages.
   * This method reads the comment messages from a redis stream, extracts the messages and their IDs, and processes them.
   * It then removes the processed messages from the redis stream.
   * @param {string} consumerGroupName - The name of the consumer group.
   * @returns {Promise<number>} - A promise that resolves with the number of messages processed.
   */
  public async processBufferedMessages(
    consumerGroupName: string,
  ): Promise<number> {
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

  /**
   * Extracts the message from a redis stream.
   * This method reads a redis stream, extracts the messages and their IDs, and returns them.
   * The method is used to process the messages in the redis stream.
   * @example
   *  const streamData: StreamData[] = [
   *    ['stream-key-1', [['id-1', ['comment-message-1', 'comment-message-2']]],
   *  const { ids, extractedMessages } = this.extractMessageFromStream(streamData);
   *  console.log(ids); // ['id-1']
   *  console.log(extractedMessages); // [CommentMessage(comment-message-1), CommentMessage(comment-message-2)]
   *
   * @param {StreamData[]} stream - The redis stream data.
   * @returns { { ids: string[], extractedMessages: CommentMessage[] } } - An object containing the IDs and the extracted messages.
   */
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

  /**
   * Process the comment messages.
   * This method takes an array of IDs and an array of comment messages, processes them by saving them to the database, and then removes the processed messages from the redis stream.
   * @param {string[]} ids - The IDs of the messages to be processed.
   * @param {CommentMessage[]} messages - The comment messages to be processed.
   * @returns {Promise<number>} - A promise that resolves with the number of messages processed.
   */
  async processMessages(ids: string[], messages: CommentMessage[]) {
    const models = messages.map((message) =>
      CommentAggregate.create(
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
