import { CommentAggregate } from '@comments/domain/aggregates';

export interface CommentRepositoryPort {
  save(model: CommentAggregate): Promise<CommentAggregate>;

  saveMany(model: CommentAggregate[]): Promise<number>;
}

export const DATABASE_PORT = Symbol('COMMENT_REPOSITORY');
