import { Controller } from '@nestjs/common';

import { CommentVideoDto, CommentVideoResponse } from '@app/contracts/comments';

import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  public constructor(private commentsService: CommentsService) {}

  /**
   * Comment on a video.
   *
   * @param {CommentVideoDto} commentVideoDto - Comment and user details.
   * @returns {Promise<CommentVideoResponse>} - Response from the comments service.
   */
  commentVideo(
    commentVideoDto: CommentVideoDto,
  ): Promise<CommentVideoResponse> {
    return this.commentsService.commentOnVideo(commentVideoDto);
  }
}
