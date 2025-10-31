import { CommentAggregate } from '@comments/domain/aggregates';

export interface BufferPort {
  bufferComment(comment: CommentAggregate): Promise<void>;

  processCommentsBatch(): Promise<number | void>;
}

export const BUFFER_PORT = 'BUFFER_PORT';
