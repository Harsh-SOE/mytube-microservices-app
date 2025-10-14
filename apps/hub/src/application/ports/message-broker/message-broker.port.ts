export interface MessageBrokerPort {
  publishMessage<TPayload>(topic: string, payload: TPayload): void;

  send<TPayload, TResponse>(
    topic: string,
    payload: TPayload,
  ): Promise<TResponse>;

  subscribeTo(topic: string): void;
}
