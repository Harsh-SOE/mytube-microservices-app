import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { MessageBrokerPort } from '@users/application/ports/message-broker';

@Injectable()
export class MessageBrokerService implements MessageBrokerPort {
  publishMessage<TPayload>(
    client: ClientKafka,
    topic: string,
    payload: TPayload,
  ): void {
    client.emit(topic, payload);
  }

  async send<TPayload, TResponse>(
    client: ClientKafka,
    topic: string,
    payload: TPayload,
  ): Promise<TResponse> {
    const response$ = client.send<TResponse, TPayload>(topic, payload);
    return await firstValueFrom(response$);
  }

  subscribeTo(client: ClientKafka, topic: string): void {
    client.subscribeToResponseOf(topic);
  }
}
