import { AggregateRoot } from '@nestjs/cqrs';

import { CommentEntity } from '../../entities';

export class CommentAggregate extends AggregateRoot {
  public constructor(private comment: CommentEntity) {
    super();
  }

  /**
   * Creates a new CommentAggregate.
   * @param {string} userId The user that commented.
   * @param {string} videoId The video that was commented on.
   * @param {string} commentText The text of the comment.
   * @returns {CommentAggregate} The newly created CommentAggregate.
   */
  public static create(
    userId: string,
    videoId: string,
    commentText: string,
  ): CommentAggregate {
    const commentEntity = CommentEntity.create(userId, videoId, commentText);
    return new CommentAggregate(commentEntity);
  }

  /**
   * Retrieves the comment entity.
   * @returns {CommentEntity} The comment entity.
   */
  public getComment() {
    return this.comment;
  }

  /**
   * Retrieves a snapshot of the comment entity.
   * The snapshot contains the user id, video id and comment text.
   * @returns {Object} A snapshot of the comment entity.
   */
  public getSnapshot() {
    return this.comment.getSnapshot();
  }
}
