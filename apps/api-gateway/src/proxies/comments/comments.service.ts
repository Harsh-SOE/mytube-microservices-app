import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CommentVideoResponse } from './response';
import {
  COMMENT_SERVICE_NAME,
  CommentServiceClient,
} from '@app/contracts/comments/comments';
import { CLIENT_PROVIDER } from '@app/clients';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommentsService implements OnModuleInit {
  private commentsService: CommentServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.COMMENTS) private commentsClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.commentsService =
      this.commentsClient.getService<CommentServiceClient>(
        COMMENT_SERVICE_NAME,
      );
  }
  async commentVideo(
    comment: string,
    userId: string,
    videoId: string,
  ): Promise<CommentVideoResponse> {
    const response$ = this.commentsService.commentService({
      comment,
      userId,
      videoId,
    });
    return await firstValueFrom(response$);
  }
}
