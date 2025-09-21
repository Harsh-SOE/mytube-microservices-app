import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommentVideoResponse } from './response';

@Injectable()
export class CommentsService implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    throw new Error('Method not implemented.');
  }
  commentVideo(
    comment: string,
    userId: string,
    videoId: string,
  ): Promise<CommentVideoResponse> {
    console.log(comment, userId, videoId);
  }
}
