import { ReactionType } from '@app/contracts/likes';

import { LikePersistanceStatus } from '@peristance/likes';

const GrpcPersistanceLikeStatusEnumMapper = new Map<
  ReactionType,
  LikePersistanceStatus
>();

GrpcPersistanceLikeStatusEnumMapper.set(
  ReactionType.REACTION_LIKE,
  LikePersistanceStatus.LIKED,
);
GrpcPersistanceLikeStatusEnumMapper.set(
  ReactionType.REACTION_UNLIKE,
  LikePersistanceStatus.UNLIKED,
);
GrpcPersistanceLikeStatusEnumMapper.set(
  ReactionType.REACTION_DISLIKE,
  LikePersistanceStatus.DISLIKED,
);
GrpcPersistanceLikeStatusEnumMapper.set(
  ReactionType.REACTION_UNDISLIKE,
  LikePersistanceStatus.UNDISLIKED,
);

export { GrpcPersistanceLikeStatusEnumMapper };
