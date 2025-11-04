export interface MessageBrokerPort {
  publishMessage<TPayload>(
    topic: string,
    payload: TPayload,
  ): void | Promise<void>;

  send<TPayload, TResponse>(
    topic: string,
    payload: TPayload,
  ): TResponse | Promise<TResponse>;

  subscribeTo(topic: string): void | Promise<void>;
}

export const MESSAGE_BROKER = Symbol('MESSAGE_BROKER');
