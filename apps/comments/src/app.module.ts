import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { CommentsCacheModule } from './infrastructure/cache';
import { CommentsModule } from './application/comments';
import { AppHealthModule } from './infrastructure/health';

@Module({
  imports: [
    AppConfigModule,
    CommentsCacheModule,
    CommentsModule,
    AppHealthModule,
  ],
})
export class AppModule {}
