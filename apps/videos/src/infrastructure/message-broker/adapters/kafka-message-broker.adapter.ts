import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CLIENT_PROVIDER } from '@app/clients';

import { MessageBrokerPort } from '@videos/application/ports';

import { KafkaMessageHandler } from '../filter';

@Injectable()
export class KafkaMessageBrokerAdapter
  implements MessageBrokerPort, OnModuleInit, OnModuleDestroy
{
  public constructor(
    @Inject(CLIENT_PROVIDER.VIDEO_TRANSCODER)
    private kafkaClient: ClientKafka,
    private kafkaFilter: KafkaMessageHandler,
  ) {}

  public async onModuleInit() {
    await this.kafkaClient.connect();
  }

  public async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  public async publishMessage<TPayload>(
    topic: string,
    payload: TPayload,
  ): Promise<void> {
    const kafkaPublishMessageOperation = () =>
      this.kafkaClient.emit(topic, payload);

    await this.kafkaFilter.filter(kafkaPublishMessageOperation, {
      operationType: 'PUBLISH_OR_SEND',
      topic,
      message: String(payload),
      logErrors: true,
      suppressErrors: false,
    });
  }

  public async send<TPayload, TResponse>(
    topic: string,
    payload: TPayload,
  ): Promise<TResponse> {
    const kafkaSendMessageOperation = () =>
      this.kafkaClient.send<TResponse, TPayload>(topic, payload);

    const response$ = await this.kafkaFilter.filter(kafkaSendMessageOperation, {
      operationType: 'PUBLISH_OR_SEND',
      topic,
      message: String(payload),
      logErrors: true,
      suppressErrors: false,
    });

    return await firstValueFrom(response$);
  }

  public async subscribeTo(topic: string): Promise<void> {
    const kafkaSubscribeOperation = () =>
      this.kafkaClient.subscribeToResponseOf(topic);
    await this.kafkaFilter.filter(kafkaSubscribeOperation, {
      operationType: 'SUBSCRIBE',
      topic,
      logErrors: true,
      suppressErrors: false,
    });
  }
}
