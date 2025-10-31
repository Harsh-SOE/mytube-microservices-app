export interface CachePort {
  set(key: string, value: string): Promise<'SET' | 'NOT_SET'>;
}
