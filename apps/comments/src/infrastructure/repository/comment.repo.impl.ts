import { Injectable } from '@nestjs/common';

import { Comment } from '@peristance/comments';

import { CommentAggregatePersistance } from '@comments/infrastructure/anti-corruption';
import { CommentAggregate } from '@comments/domain/aggregates';
import { CommentRepositoryPort } from '@comments/application/ports';

import { PersistanceService } from '../persistance';

@Injectable()
export class PrismaRepositoryAdapter implements CommentRepositoryPort {
  constructor(
    private persistanceService: PersistanceService,
    private commentAggregatePersistanceACL: CommentAggregatePersistance,
  ) {}

  /**
   * Saves a single comment to the database.
   * @param {CommentAggregate} model - The comment to be saved.
   * @returns {Promise<Comment>} - A promise that resolves to the saved comment.
   */
  async saveAComment(model: CommentAggregate): Promise<Comment> {
    const comment = this.commentAggregatePersistanceACL.toPersistance(model);
    return await this.persistanceService.comment.create({ data: comment });
  }

  /**
   * Saves many comments to the database.
   * @param {CommentAggregate[]} models - The comments to be saved.
   * @returns {Promise<number>} - A promise that resolves to the number of comments saved.
   */
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
