import { CommentAggregate } from '@comments-aggregator/domain/aggregates';

import { Comment } from '@peristance/comments-aggregator';

export interface CommentRepositoryPort {
  saveAComment(model: CommentAggregate): Promise<Comment>;

  saveManyComments(model: CommentAggregate[]): Promise<number>;
}

export const COMMENT_REPOSITORY = Symbol('COMMENT_REPOSITORY');
