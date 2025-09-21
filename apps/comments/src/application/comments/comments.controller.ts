import {
  CommentVideoDto,
  CommentVideoResponse,
} from '@app/contracts/comments/comments';
import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  public constructor(private commentsService: CommentsService) {}

  commentVideo(
    commentVideoDto: CommentVideoDto,
  ): Promise<CommentVideoResponse> {
    return this.commentsService.commentOnVideo(commentVideoDto);
  }
}
