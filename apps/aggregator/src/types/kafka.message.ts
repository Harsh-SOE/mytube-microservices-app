export type KafkaLikeMessage = {
  id: string;
  userId: string;
  videoId: string;
  likeStatus: string;
  delta: number;
};
