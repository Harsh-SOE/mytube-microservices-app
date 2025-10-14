import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { MessageBrokerPort } from '@hub/application/ports';

@Injectable()
export class MessageBrokerService
  implements MessageBrokerPort, OnModuleInit, OnModuleDestroy
{
  constructor(private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  publishMessage<TPayload>(topic: string, payload: TPayload): void {
    this.kafkaClient.emit(topic, payload);
  }

  async send<TPayload, TResponse>(
    topic: string,
    payload: TPayload,
  ): Promise<TResponse> {
    const response$ = this.kafkaClient.send<TResponse, TPayload>(
      topic,
      payload,
    );
    return await firstValueFrom(response$);
  }
  subscribeTo(topic: string): void {
    this.kafkaClient.subscribeToResponseOf(topic);
  }
}
