import { Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CLIENT_PROVIDER } from '@app/clients';

import { MessageBrokerPort } from '@comments/application/ports';
import { kafkaMessageHandler } from '../filter';

export class KafkaMessageBrokerAdapter
  implements MessageBrokerPort, OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(CLIENT_PROVIDER.COMMENTS_AGGREGATOR)
    private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  publishMessage<TPayload>(topic: string, payload: TPayload): void {
    const kafkaPublishMessageOperation = () =>
      this.kafkaClient.emit(topic, payload);

    kafkaMessageHandler(kafkaPublishMessageOperation);
  }

  async send<TPayload, TResponse>(
    topic: string,
    payload: TPayload,
  ): Promise<TResponse> {
    const kafkaSendMessageOperation = () =>
      this.kafkaClient.send<TResponse, TPayload>(topic, payload);

    const response$ = await kafkaMessageHandler(kafkaSendMessageOperation);

    return await firstValueFrom(response$);
  }

  subscribeTo(topic: string): void {
    const kafkaSubscribeOperation = () =>
      this.kafkaClient.subscribeToResponseOf(topic);
    kafkaMessageHandler(kafkaSubscribeOperation);
  }
}
