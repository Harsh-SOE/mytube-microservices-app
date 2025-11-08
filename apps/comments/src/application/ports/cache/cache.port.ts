export interface CommentCachePort {
  incrementCommentsCounter(
    userId: string,
    videoId: string,
  ): Promise<number | null>;

  getTotalCommentsCounter(videoId: string): Promise<number>;
}

export const CACHE_PORT = 'CACHE_PORT';
