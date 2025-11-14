export interface CommentMessageBrokerPort {
  publishMessage(topic: string, payload: string): Promise<void>;

  subscribeTo(topic: string): Promise<void>;
}

export const MESSAGE_BROKER = 'MESSAGE_BROKER';
