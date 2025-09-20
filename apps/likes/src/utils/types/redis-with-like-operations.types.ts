export interface RedisLikesOperations {
  videoLikesCountIncrScriptFunction(
    usersLikedSetKey: string, // liked by user set key
    usersDislikedSetKey: string, // disliked by user set key
    videoLikeCounterKey: string, // video likes counter key
    videoDislikeCounterKey: string, // video dislikes counter key
    userId: string,
  ): Promise<number>;

  videoLikesCountDecrScriptFunction(
    usersLikedSetKey: string, // liked by user set key
    videoLikeCounterKey: string, // video likes counter key
    userId: string,
  ): Promise<number>;

  videoDislikesCountIncrScriptFunction(
    usersDislikedSetKey: string, // disliked by user set key
    usersLikedSetKey: string, // liked by user set key
    videoDislikeCounterKey: string, // video disliked counter key
    videoLikeCounterKey: string, // video liked counter key
    userId: string,
  ): Promise<number>;

  videoDislikesCountDecrScriptFunction(
    usersDislikedSetKey: string, // liked by users set key
    videoDislikeCounterKey: string, // video disliked counter key
    userId: string,
  ): Promise<number>;
}
