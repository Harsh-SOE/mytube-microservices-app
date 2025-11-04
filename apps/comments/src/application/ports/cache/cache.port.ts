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

  incrementCommentCounter(
    userCommentSetKey: string,
    userCommentCounterKey: string,
    userId: string,
  ): Promise<number | null>;
}

export const CACHE_PORT = 'CACHE_PORT';
