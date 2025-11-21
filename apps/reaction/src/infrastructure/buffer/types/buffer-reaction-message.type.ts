import { ReactionType } from '@app/contracts/reaction';

export type ReactionMessage = {
  userId: string;
  videoId: string;
  reactionStatus: ReactionType;
};
