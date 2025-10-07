import { GatewayJwtGuard } from '@gateway/infrastructure/auth';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { COMMENT_API } from './api';
import { CommentOnVideo } from './request';
import { User } from '@gateway/utils/decorators';
import { CommentsService } from './comments.service';
import { UserAuthPayload } from '@app/contracts/auth';

@Controller('comments')
@UseGuards(GatewayJwtGuard)
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post(COMMENT_API.COMMENT_ON_VIDEO)
  commentVideo(
    @Body() commentVideoDto: CommentOnVideo,
    @User() user: UserAuthPayload,
    @Param('videoId') videoId: string,
  ) {
    return this.commentService.commentVideo(
      commentVideoDto.comment,
      user.id,
      videoId,
    );
  }
}
