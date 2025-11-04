import { ReactionType } from '@app/contracts/likes';

import { LikeDomainStatus } from '@likes/domain/enums';

const GrpcDomainLikeStatusEnumMapper = new Map<
  ReactionType,
  LikeDomainStatus
>();

GrpcDomainLikeStatusEnumMapper.set(
  ReactionType.REACTION_LIKE,
  LikeDomainStatus.LIKED,
);
GrpcDomainLikeStatusEnumMapper.set(
  ReactionType.REACTION_UNLIKE,
  LikeDomainStatus.UNLIKED,
);
GrpcDomainLikeStatusEnumMapper.set(
  ReactionType.REACTION_DISLIKE,
  LikeDomainStatus.DISLIKED,
);
GrpcDomainLikeStatusEnumMapper.set(
  ReactionType.REACTION_UNDISLIKE,
  LikeDomainStatus.UNDISLIKED,
);

export { GrpcDomainLikeStatusEnumMapper };
