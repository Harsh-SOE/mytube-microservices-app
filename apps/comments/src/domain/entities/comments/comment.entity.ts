import { CommentText, UserId, VideoId } from '../../value-objects';
import { v4 as uuidv4 } from 'uuid';

export class CommentEntity {
  public constructor(
    private readonly id: string,
    private readonly userId: UserId,
    private readonly videoId: VideoId,
    private commentText: CommentText,
  ) {}

  /**
   * Creates a new CommentEntity.
   * @param {string} userId The user that commented.
   * @param {string} videoId The video that was commented on.
   * @param {string} commentText The text of the comment.
   * @returns {CommentEntity} The newly created CommentEntity.
   */
  public static create(
    userId: string,
    videoId: string,
    commentText: string,
  ): CommentEntity {
    return new CommentEntity(
      uuidv4(),
      UserId.create(userId),
      VideoId.create(videoId),
      CommentText.create(commentText),
    );
  }

  /**
   * Retrieves the id of the comment.
   * @returns {string} The id of the comment.
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Retrieves the user id that commented.
   * @returns {string} The user id that commented.
   */
  public getUserId(): string {
    return this.userId.getValue();
  }

  /**
   * Retrieves the video id that the comment was made on.
   * @returns {string} The video id that the comment was made on.
   */
  public getVideoId(): string {
    return this.videoId.getValue();
  }

  /**
   * Retrieves the text of the comment.
   * @returns {string} The text of the comment.
   */
  public getCommentText(): string {
    return this.commentText.getValue();
  }

  /**
   * Retrieves a snapshot of the comment entity.
   * The snapshot contains the user id, video id and comment text.
   * @returns {Object} A snapshot of the comment entity.
   */
  public getSnapshot() {
    return {
      userId: this.userId,
      videoId: this.videoId,
      commentText: this.commentText,
    };
  }

  /**
   * Updates the comment text of the comment entity.
   * @param {string} newComment The new comment text.
   * @returns {CommentText} The newly updated CommentText.
   */
  public updateCommentText(newComment: string): CommentText {
    return CommentText.create(newComment);
  }
}
