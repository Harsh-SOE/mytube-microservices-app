import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { CommentMessage } from '@comments-aggregator/types';

import { CommentsAggregatorService } from './comments-aggregator.service';

@Controller()
export class CommentsAggregatorController {
  constructor(private commentsAggregator: CommentsAggregatorService) {}

  @EventPattern('video.comment')
  /**
   * Handle a comment message emitted by a video comment event.
   * The message is forwarded to the comments aggregator service.
   * @param {CommentMessage} message - The comment message emitted by the event.
   * @returns {Promise<CommentMessage>} - The result of forwarding the message to the comments aggregator service.
   */
  bufferComments(message: CommentMessage) {
    return this.commentsAggregator.bufferCommentMessage(message);
  }
}
