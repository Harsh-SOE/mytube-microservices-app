import Redis from 'ioredis';

export interface RedisWithCommands extends Redis {
  commentVideo(
    userCommentSetKey: string,
    userCommentCounterKey: string,
    userId: string,
  ): Promise<number>;
}
