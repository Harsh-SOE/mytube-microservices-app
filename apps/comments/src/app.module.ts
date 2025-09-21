import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { CommentsCacheModule } from './infrastructure/cache/cache.module';
import { CommentsModule } from './application/comments/comments.module';

@Module({
  imports: [AppConfigModule, CommentsCacheModule, CommentsModule],
})
export class AppModule {}
