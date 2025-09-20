import { LikeTransportStatus } from '@app/contracts/likes';
import { LikeRequestStatus } from '../../enums';

const GrpcClientLikeStatusEnumMapper = new Map<
  LikeTransportStatus,
  LikeRequestStatus
>();

GrpcClientLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_LIKE,
  LikeRequestStatus.LIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_UNLIKE,
  LikeRequestStatus.UNLIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_DISLIKE,
  LikeRequestStatus.DISLIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_UNDISLIKE,
  LikeRequestStatus.UNDISKLIKE,
);

export { GrpcClientLikeStatusEnumMapper };
