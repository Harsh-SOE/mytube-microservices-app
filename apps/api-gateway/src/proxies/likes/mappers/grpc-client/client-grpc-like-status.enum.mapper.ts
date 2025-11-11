import { ReactionType } from '@app/contracts/likes';

import { LikeRequestStatus } from '../../enums';

const GrpcClientLikeStatusEnumMapper = new Map<
  ReactionType,
  LikeRequestStatus
>();

GrpcClientLikeStatusEnumMapper.set(
  ReactionType.REACTION_LIKE,
  LikeRequestStatus.LIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  ReactionType.REACTION_UNLIKE,
  LikeRequestStatus.UNLIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  ReactionType.REACTION_DISLIKE,
  LikeRequestStatus.DISLIKE,
);
GrpcClientLikeStatusEnumMapper.set(
  ReactionType.REACTION_UNDISLIKE,
  LikeRequestStatus.UNDISKLIKE,
);

export { GrpcClientLikeStatusEnumMapper };
