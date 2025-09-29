export interface RedisWithWatchOperations {
  viewVideoCounterIncr(
    userWatchSetKey: string,
    videoWatchCounterKey: string,
    userId: string,
  ): Promise<number>;
}
