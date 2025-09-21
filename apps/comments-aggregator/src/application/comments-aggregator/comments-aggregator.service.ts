import { Injectable } from '@nestjs/common';
import { CommentAggregatorCacheService } from '../../infrastructure/cache/cache.service';
import { CommentMessage } from '../../types';

@Injectable()
export class CommentsAggregatorService {
  constructor(private cacheService: CommentAggregatorCacheService) {}

  async bufferCommentMessage(message: CommentMessage) {
    await this.cacheService.bufferCommentMessage(message);
  }
}
