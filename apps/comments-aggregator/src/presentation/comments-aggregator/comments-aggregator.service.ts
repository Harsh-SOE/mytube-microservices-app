import { Injectable } from '@nestjs/common';

import { CommentAggregatorCacheService } from '@comments-aggregator/infrastructure/cache';
import { CommentMessage } from '@comments-aggregator/types';

@Injectable()
export class CommentsAggregatorService {
  constructor(private cacheService: CommentAggregatorCacheService) {}

  /**
   * Buffers a comment message in a redis stream.
   * This method is used to save comment messages in a redis stream before they are processed.
   * The stream is configured in the AppConfigService.
   * @param {CommentMessage} message - The comment message to be buffered.
   * @returns {Promise<number>} - A promise that resolves with the number of messages buffered.
   */
  async bufferCommentMessage(message: CommentMessage) {
    await this.cacheService.bufferCommentMessage(message);
  }
}
