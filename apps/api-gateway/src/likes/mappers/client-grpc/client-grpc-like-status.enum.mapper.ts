import { LikeStatus } from '@app/contracts/likes';
import { LikeRequestStatus } from '../../enums';

const ClientGrpcLikeStatusEnumMapper = new Map<LikeRequestStatus, LikeStatus>();

ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.LIKE,
  LikeStatus.LIKE_STATUS_LIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.UNLIKE,
  LikeStatus.LIKE_STATUS_UNLIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.DISLIKE,
  LikeStatus.LIKE_STATUS_DISLIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.UNDISKLIKE,
  LikeStatus.LIKE_STATUS_UNDISLIKE,
);

export { ClientGrpcLikeStatusEnumMapper };
