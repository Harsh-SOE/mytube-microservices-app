import { LikeTransportStatus } from '@app/contracts/likes';

export type LikeMessage = {
  userId: string;
  videoId: string;
  likeStatus: LikeTransportStatus;
  delta: number;
};
