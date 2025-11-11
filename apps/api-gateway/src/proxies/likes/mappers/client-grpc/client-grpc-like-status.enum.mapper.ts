import { ReactionType } from '@app/contracts/likes';

import { LikeRequestStatus } from '../../enums';

const ClientGrpcLikeStatusEnumMapper = new Map<
  LikeRequestStatus,
  ReactionType
>();

ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.LIKE,
  ReactionType.REACTION_LIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.UNLIKE,
  ReactionType.REACTION_UNLIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.DISLIKE,
  ReactionType.REACTION_DISLIKE,
);
ClientGrpcLikeStatusEnumMapper.set(
  LikeRequestStatus.UNDISKLIKE,
  ReactionType.REACTION_UNDISLIKE,
);

export { ClientGrpcLikeStatusEnumMapper };
