import Redis from 'ioredis';

export interface RedisWithCommands extends Redis {
  watchVideoCounterIncr(
    videoWatchUserSetKey: string,
    videoWatchCounterKey: string,
    userId: string,
  ): Promise<number>;
}
