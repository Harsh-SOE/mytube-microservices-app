export interface RedisWithWatchOperations {
  videoWatchCounterIncrScriptFunction(
    userWatchSetKey: string,
    videoWatchCounterKey: string,
    userId: string,
  ): Promise<number>;
}
