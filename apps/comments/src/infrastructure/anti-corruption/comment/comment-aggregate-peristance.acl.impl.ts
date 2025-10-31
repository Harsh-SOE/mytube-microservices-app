import { Injectable } from '@nestjs/common';

import { IAggregatePersistanceACL } from '@app/infrastructure';
import { Comment } from '@peristance/comments';

import { CommentAggregate } from '@comments/domain/aggregates';
import { CommentEntity } from '@comments/domain/entities';
import { CommentText, UserId, VideoId } from '@comments/domain/value-objects';

@Injectable()
export class CommentAggregatePersistance
  implements
    IAggregatePersistanceACL<
      CommentAggregate,
      Omit<Comment, 'createdAt' | 'updatedAt'>
    >
{
  /**
   * Creates a CommentAggregate from a given persistence model.
   * The persistence model should contain the following properties:
   * - id: The id of the comment.
   * - commentedByUserId: The user id of the user who commented.
   * - commentedForVideoId: The video id of the video that was commented on.
   * - commentText: The text of the comment.
   * @param {Omit<Comment, 'createdAt' | 'updatedAt'>} persistance The persistence model.
   * @returns {CommentAggregate} The newly created CommentAggregate.
   */
  toAggregate(
    persistance: Omit<Comment, 'createdAt' | 'updatedAt'>,
  ): CommentAggregate {
    const commentEntity = new CommentEntity(
      persistance.id,
      UserId.create(persistance.commentedByUserId),
      VideoId.create(persistance.commentedForVideoId),
      CommentText.create(persistance.commentText),
    );
    return new CommentAggregate(commentEntity);
  }

  /**
   * Creates a persistence model from a given CommentAggregate.
   * The persistence model contains the following properties:
   * - id: The id of the comment.
   * - commentedByUserId: The user id of the user who commented.
   * - commentedForVideoId: The video id of the video that was commented on.
   * - commentText: The text of the comment.
   * @param {CommentAggregate} aggregate The CommentAggregate.
   * @returns {Omit<Comment, 'createdAt' | 'updatedAt'>} The newly created persistence model.
   */

  toPersistance(
    aggregate: CommentAggregate,
  ): Omit<Comment, 'createdAt' | 'updatedAt'> {
    return {
      id: aggregate.getComment().getId(),
      commentedByUserId: aggregate.getComment().getUserId(),
      commentedForVideoId: aggregate.getComment().getVideoId(),
      commentText: aggregate.getComment().getCommentText(),
    };
  }
}
