import { LikeTransportStatus } from '@app/contracts/likes';
import { LikeRequestStatus } from '../../enums';

const ClientGrpcLikeStatusEnumMapper = new Map<
  LikeRequestStatus,
  LikeTransportStatus
>();

ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.LIKE,
  LikeTransportStatus.TRANSPORT_LIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.UNLIKE,
  LikeTransportStatus.TRANSPORT_UNLIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.DISLIKE,
  LikeTransportStatus.TRANSPORT_DISLIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.UNDISKLIKE,
  LikeTransportStatus.TRANSPORT_UNDISLIKE,
);

export { ClientGrpcLikeStatusEnumMapper };
