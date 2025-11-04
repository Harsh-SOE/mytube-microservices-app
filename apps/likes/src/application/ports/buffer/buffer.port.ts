import { LikeAggregate } from '@likes/domain/aggregates';

export interface BufferPort {
  bufferLike(like: LikeAggregate): Promise<void>;

  processLikesBatch(): Promise<number | void>;
}

export const BUFFER_PORT = Symbol('BUFFER_PORT');
