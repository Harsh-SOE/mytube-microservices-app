export interface RedisWithWatchOperations {
  WatchVideoCounterIncr(
    userWatchSetKey: string,
    videoWatchCounterKey: string,
    userId: string,
  ): Promise<number>;
}
