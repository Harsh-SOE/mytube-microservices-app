import { Controller } from '@nestjs/common';

import { CommentVideoDto, CommentVideoResponse } from '@app/contracts/comments';

import { GrpcService } from './grpc.service';

@Controller('comments')
export class GrpcController {
  public constructor(private commentsService: GrpcService) {}

  commentVideo(
    commentVideoDto: CommentVideoDto,
  ): Promise<CommentVideoResponse> {
    return this.commentsService.commentOnVideo(commentVideoDto);
  }
}
