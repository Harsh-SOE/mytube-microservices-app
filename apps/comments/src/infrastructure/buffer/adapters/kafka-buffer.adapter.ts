import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, EachBatchPayload, Kafka, Producer } from 'kafkajs';

import { BufferPort, CommentRepositoryPort } from '@comments/application/ports';
import { CommentAggregate } from '@comments/domain/aggregates';
import { AppConfigService } from '@comments/infrastructure/config';

import { CommentMessage } from '../types';

export class KafkaBufferAdapter
  implements OnModuleInit, OnModuleDestroy, BufferPort
{
  private kafkaClient: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(
    private readonly configService: AppConfigService,
    private readonly commentsRepo: CommentRepositoryPort,
  ) {
    this.kafkaClient = new Kafka({
      brokers: [
        `${configService.MESSAGE_BROKER_SERVICE_HOST}:${configService.MESSAGE_BROKER_SERVICE_PORT}`,
      ],
      clientId: 'comment-service',
    });

    this.producer = this.kafkaClient.producer();

    this.consumer = this.kafkaClient.consumer({
      groupId: `comment-batcher`,
      maxWaitTimeInMs: 1_500,
      maxBytesPerPartition: 512_000,
      sessionTimeout: 30_000,
      heartbeatInterval: 3_000,
      retry: {
        initialRetryTime: 100,
        retries: 8,
      },
    });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: 'comments', fromBeginning: false });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async bufferComment(comment: CommentAggregate): Promise<void> {
    await this.producer.send({
      topic: 'comments',
      messages: [{ value: JSON.stringify(comment.getSnapshot()) }],
    });
  }

  async processCommentsBatch(): Promise<number | void> {
    await this.consumer.run({
      eachBatch: async (payload: EachBatchPayload) => {
        const { batch } = payload;
        const messages = batch.messages
          .filter((message) => message.value)
          .map(
            (message) =>
              JSON.parse(message.value!.toString()) as CommentMessage,
          );

        const models = messages.map((message) =>
          CommentAggregate.create(
            message.userId,
            message.videoId,
            message.commentText,
          ),
        );

        console.log(`Saving ${models.length} comments in database`);

        await this.commentsRepo.saveManyComments(models);

        console.log(`${models.length} comments saved in database`);
      },
    });
  }
}
