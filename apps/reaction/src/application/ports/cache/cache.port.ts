export interface ReactionCachePort {
  getTotalLikes(videoId: string): Promise<number>;

  getTotalDislikes(videoId: string): Promise<number>;

  recordLike(videoId: string, userId: string): Promise<number>;

  removeLike(videoId: string, userId: string): Promise<number>;

  recordDislike(videoId: string, userId: string): Promise<number>;

  removeDislike(videoId: string, userId: string): Promise<number>;
}

export const CACHE_PORT = Symbol('CACHE_PORT');
