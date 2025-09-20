import { LikeTransportStatus } from '@app/contracts/likes';

export type KafkaLikeMessage = {
  userId: string;
  videoId: string;
  likeStatus: LikeTransportStatus;
  delta: number;
};
