import Redis from 'ioredis';

export interface RedisWithCommands extends Redis {
  videoLikesCountIncrScriptFunction(
    usersLikedSetKey: string,
    usersDislikedSetKey: string,
    videoLikeCounterKey: string,
    videoDislikeCounterKey: string,
    userId: string,
  ): Promise<number>;

  videoLikesCountDecrScriptFunction(
    usersLikedSetKey: string,
    videoLikeCounterKey: string,
    userId: string,
  ): Promise<number>;

  videoDislikesCountIncrScriptFunction(
    usersDislikedSetKey: string,
    usersLikedSetKey: string,
    videoDislikeCounterKey: string,
    videoLikeCounterKey: string,
    userId: string,
  ): Promise<number>;

  videoDislikesCountDecrScriptFunction(
    usersDislikedSetKey: string,
    videoDislikeCounterKey: string,
    userId: string,
  ): Promise<number>;
}
