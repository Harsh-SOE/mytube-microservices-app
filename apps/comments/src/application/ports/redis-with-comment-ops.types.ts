export interface RedisWithCommentsOps {
  commentVideo(
    userCommentSetKey: string,
    userCommentCounterKey: string,
    userId: string,
  ): Promise<number>;
}
