import { Module } from '@nestjs/common';
import { CommentsCacheService } from './cache.service';

@Module({
  providers: [CommentsCacheService],
  exports: [CommentsCacheService],
})
export class CommentsCacheModule {}
