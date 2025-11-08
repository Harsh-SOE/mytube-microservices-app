export interface VideoCachePort {
  cacheVideo(videoId: string, userId: string): Promise<number>;

  getVideo(videoId: string): Promise<number>;
}

export const CACHE_PORT = Symbol('CACHE_PORT');
