import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { UserAuthPayload } from '@app/contracts/auth';

import { GatewayJwtGuard } from '@gateway/proxies/auth/guards';
import { User } from '@gateway/proxies/auth/decorators';

import { COMMENT_API } from './api';
import { CommentsService } from './comments.service';
import { CommentOnVideo } from './request';

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
