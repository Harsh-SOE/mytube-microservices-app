export interface RedisLikesOperations {
  videoLikesCountIncr(
    usersLikedSetKey: string, // liked by user set key
    usersDislikedSetKey: string, // disliked by user set key
    videoLikeCounterKey: string, // video likes counter key
    videoDislikeCounterKey: string, // video dislikes counter key
    userId: string,
  ): Promise<number>;

  videoLikesCountDecr(
    usersLikedSetKey: string, // liked by user set key
    videoLikeCounterKey: string, // video likes counter key
    userId: string,
  ): Promise<number>;

  videoDislikesCountIncr(
    usersDislikedSetKey: string, // disliked by user set key
    usersLikedSetKey: string, // liked by user set key
    videoDislikeCounterKey: string, // video disliked counter key
    videoLikeCounterKey: string, // video liked counter key
    userId: string,
  ): Promise<number>;

  videoDislikesCountDecr(
    usersDislikedSetKey: string, // liked by users set key
    videoDislikeCounterKey: string, // video disliked counter key
    userId: string,
  ): Promise<number>;
}
