import { ClientKafka } from '@nestjs/microservices';

export interface MessageBrokerPort {
  publishMessage<TPayload>(
    client: ClientKafka,
    topic: string,
    payload: TPayload,
  ): void;

  send<TPayload, TResponse>(
    client: ClientKafka,
    topic: string,
    payload: TPayload,
  ): Promise<TResponse>;

  subscribeTo(client: ClientKafka, topic: string): void;
}

export const MESSAGE_BROKER = 'MESSAGE_BROKER';
