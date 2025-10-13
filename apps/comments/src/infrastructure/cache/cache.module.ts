import { Module } from '@nestjs/common';

import { AppConfigModule } from '@comments/infrastructure/config';

import { CommentsCacheService } from './cache.service';

@Module({
  imports: [AppConfigModule],
  providers: [CommentsCacheService],
  exports: [CommentsCacheService],
})
export class CommentsCacheModule {}
