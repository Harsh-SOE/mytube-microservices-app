export * from './get-dislikes-video-queries';
export * from './get-likes-video-queries';
export * from './dto/reaction.model';

import { GetDislikesVideoQueryHandler } from './get-dislikes-video-queries';
import { GetLikesVideoQueryHandler } from './get-likes-video-queries';

export const LikeQueriesHandler = [
  GetDislikesVideoQueryHandler,
  GetLikesVideoQueryHandler,
];
