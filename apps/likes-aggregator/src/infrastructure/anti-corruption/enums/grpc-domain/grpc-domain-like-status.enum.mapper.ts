import { LikeDomainStatus } from '@likes-aggregator/domain/domain-enums';
import { LikeTransportStatus } from '@app/contracts/likes';

const GrpcDomainLikeStatusEnumMapper = new Map<
  LikeTransportStatus,
  LikeDomainStatus
>();

GrpcDomainLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_LIKE,
  LikeDomainStatus.LIKED,
);
GrpcDomainLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_UNLIKE,
  LikeDomainStatus.UNLIKED,
);
GrpcDomainLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_DISLIKE,
  LikeDomainStatus.DISLIKED,
);
GrpcDomainLikeStatusEnumMapper.set(
  LikeTransportStatus.TRANSPORT_UNDISLIKE,
  LikeDomainStatus.UNDISLIKED,
);

export { GrpcDomainLikeStatusEnumMapper };
