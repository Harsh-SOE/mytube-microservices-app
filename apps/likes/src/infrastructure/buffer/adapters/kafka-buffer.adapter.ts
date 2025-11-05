import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Consumer, EachBatchPayload, Kafka, Producer } from 'kafkajs';

import {
  BufferPort,
  LikeRepositoryPort,
  LoggerPort,
  LOGGER_PORT,
  DATABASE_PORT,
} from '@likes/application/ports';
import { LikeAggregate } from '@likes/domain/aggregates';
import { AppConfigService } from '@likes/infrastructure/config';
import { GrpcDomainLikeStatusEnumMapper } from '@likes/infrastructure/anti-corruption';

import { LikeMessage } from '../types';

export const LIKE_BUFFER_TOPIC = 'likes';

@Injectable()
export class KafkaBufferAdapter
  implements OnModuleInit, OnModuleDestroy, BufferPort
{
  private readonly kafkaClient: Kafka;
  private readonly producer: Producer;
  private readonly consumer: Consumer;

  public constructor(
    private readonly configService: AppConfigService,
    @Inject(DATABASE_PORT) private readonly likesRepo: LikeRepositoryPort,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {
    this.kafkaClient = new Kafka({
      brokers: [
        `${configService.MESSAGE_BROKER_HOST}:${configService.MESSAGE_BROKER_PORT}`,
      ],
      clientId: this.configService.BUFFER_CLIENT_ID,
    });

    this.producer = this.kafkaClient.producer();

    this.consumer = this.kafkaClient.consumer({
      groupId: this.configService.BUFFER_KAFKA_CONSUMER_ID,
      maxWaitTimeInMs: this.configService.BUFFER_FLUSH_MAX_WAIT_TIME_MS,
      maxBytesPerPartition: 512_000,
      sessionTimeout: 30_000,
      heartbeatInterval: 3_000,
      retry: {
        initialRetryTime: 100,
        retries: 8,
      },
    });
  }

  public async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();

    await this.consumer.subscribe({
      topic: LIKE_BUFFER_TOPIC,
      fromBeginning: false,
    });
  }

  public async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  public async bufferLike(like: LikeAggregate): Promise<void> {
    await this.producer.send({
      topic: LIKE_BUFFER_TOPIC,
      messages: [{ value: JSON.stringify(like.getSnapshot()) }],
    });
  }

  public async processLikesBatch(): Promise<number | void> {
    await this.consumer.run({
      eachBatch: async (payload: EachBatchPayload) => {
        const { batch } = payload;
        const messages = batch.messages
          .filter((message) => message.value)
          .map(
            (message) => JSON.parse(message.value!.toString()) as LikeMessage,
          );

        const models = messages.map((message) => {
          const likeStatus = GrpcDomainLikeStatusEnumMapper.get(
            message.likeStatus,
          );
          if (!likeStatus) throw new Error();
          return LikeAggregate.create(
            message.userId,
            message.videoId,
            likeStatus,
          );
        });

        this.logger.info(`Saving ${models.length} likes in database`);

        await this.likesRepo.saveMany(models);

        this.logger.info(`${models.length} likes saved in database`);
      },
    });
  }
}
