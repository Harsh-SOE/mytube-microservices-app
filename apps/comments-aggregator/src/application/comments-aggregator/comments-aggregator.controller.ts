import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommentMessage } from '../../types';
import { CommentsAggregatorService } from './comments-aggregator.service';

@Controller()
export class CommentsAggregatorController {
  constructor(private commentsAggregator: CommentsAggregatorService) {}

  @EventPattern('video.comment')
  bufferComments(message: CommentMessage) {
    return this.commentsAggregator.bufferCommentMessage(message);
  }
}
