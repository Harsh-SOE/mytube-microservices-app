import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { CommentsCacheModule } from './infrastructure/cache/cache.module';
import { CommentsModule } from './application/comments/comments.module';
import { AppHealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    AppConfigModule,
    CommentsCacheModule,
    CommentsModule,
    AppHealthModule,
  ],
})
export class AppModule {}
