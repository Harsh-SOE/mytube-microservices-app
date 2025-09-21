import { Module } from '@nestjs/common';
import { CommentAggregatorCacheService } from './cache.service';

@Module({
  providers: [CommentAggregatorCacheService],
  exports: [CommentAggregatorCacheService],
})
export class CommentAggregatorCacheModule {}
