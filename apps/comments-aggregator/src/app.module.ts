import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { CommentAggregatorCacheModule } from './infrastructure/cache';
import { PersistanceModule } from './infrastructure/persistance';
import { CommentsAggregatorModule } from './application/comments-aggregator';
import { AppHealthModule } from './infrastructure/health';

@Module({
  imports: [
    AppConfigModule,
    CommentAggregatorCacheModule,
    PersistanceModule,
    CommentsAggregatorModule,
    AppHealthModule,
  ],
})
export class AppModule {}
