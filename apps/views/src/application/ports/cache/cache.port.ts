export interface ViewCachePort {
  getTotalViews(videoId: string): Promise<number>;

  recordView(videoId: string, userId: string): Promise<number>;
}

export const CACHE_PORT = Symbol('CACHE_PORT');
