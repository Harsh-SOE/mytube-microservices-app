import { LikeStatus } from '@app/contracts/likes';
import { LikeRequestStatus } from '../../enums';

const GrpcClientLikeStatusEnumMapper = new Map<LikeStatus, LikeRequestStatus>();

GrpcClientLikeStatusEnumMapper.set(
  LikeStatus.LIKE_STATUS_LIKE,
  LikeRequestStatus.LIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  LikeStatus.LIKE_STATUS_UNLIKE,
  LikeRequestStatus.UNLIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  LikeStatus.LIKE_STATUS_DISLIKE,
  LikeRequestStatus.DISLIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  LikeStatus.LIKE_STATUS_UNDISLIKE,
  LikeRequestStatus.UNDISKLIKE,
);

export { GrpcClientLikeStatusEnumMapper };
