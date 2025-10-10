import { Injectable } from '@nestjs/common';
import { ICommentRepo } from './comment.repo';
import { CommentAggregate } from '../../domain/aggregates';
import { Comment } from 'apps/comments-aggregator/generated/prisma';
import { PersistanceService } from '../persistance';
import { CommentAggregatePersistance } from '../anti-corruption/comment';

@Injectable()
export class CommentRepo implements ICommentRepo<CommentAggregate, Comment> {
  constructor(
    private persistanceService: PersistanceService,
    private commentAggregatePersistanceACL: CommentAggregatePersistance,
  ) {}

  async saveAComment(model: CommentAggregate): Promise<Comment> {
    const comment = this.commentAggregatePersistanceACL.toPersistance(model);
    return await this.persistanceService.comment.create({ data: comment });
  }
  async saveManyComments(models: CommentAggregate[]): Promise<number> {
    const comments = models.map((model) =>
      this.commentAggregatePersistanceACL.toPersistance(model),
    );
    const createdComments = await this.persistanceService.comment.createMany({
      data: comments,
    });

    return createdComments.count;
  }
}
