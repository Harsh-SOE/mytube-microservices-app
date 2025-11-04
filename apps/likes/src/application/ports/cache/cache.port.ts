import { CacheSetoptions } from './types/options';

export interface CachePort {
  saveInCache(
    key: string,
    value: string,
    options: CacheSetoptions,
  ): Promise<'OK'>;

  saveManyInCache(
    keyValues: Record<string, string>,
    options: CacheSetoptions,
  ): Promise<'OK'>;

  fetchFromCache(key: string): Promise<string | null>;

  fetchManyFromCache(keys: string[]): Promise<Array<string | null>>;

  deleteFromCache(key: string): Promise<'DELETED'>;

  videoLikesCountIncr(
    usersLikedSetKey: string,
    usersDislikedSetKey: string,
    videoLikeCounterKey: string,
    videoDislikeCounterKey: string,
    userId: string,
  ): Promise<number>;

  videoLikesCountDecr(
    usersLikedSetKey: string,
    videoLikeCounterKey: string,
    userId: string,
  ): Promise<number>;

  videoDislikesCountIncr(
    usersDislikedSetKey: string,
    usersLikedSetKey: string,
    videoDislikeCounterKey: string,
    videoLikeCounterKey: string,
    userId: string,
  ): Promise<number>;

  videoDislikesCountDecr(
    usersDislikedSetKey: string,
    videoDislikeCounterKey: string,
    userId: string,
  ): Promise<number>;
}

export const CACHE_PORT = Symbol('CACHE_PORT');
