import { LikeTransportStatus } from '@app/contracts/likes';
import { LikePersistanceStatus } from '@peristance/likes-aggregator';

const GrpcPersistanceLikeStatusEnumMapper = new Map<
  LikeTransportStatus,
  LikePersistanceStatus
>();

GrpcPersistanceLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_LIKE,
  LikePersistanceStatus.LIKED,
);
GrpcPersistanceLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_UNLIKE,
  LikePersistanceStatus.UNLIKED,
);
GrpcPersistanceLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_DISLIKE,
  LikePersistanceStatus.DISLIKED,
);
GrpcPersistanceLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_UNDISLIKE,
  LikePersistanceStatus.UNDISLIKED,
);

export { GrpcPersistanceLikeStatusEnumMapper };
