import { Module } from '@nestjs/common';
import { AppConfigModule } from './infrastructure/config/config.module';
import { CommentAggregatorCacheModule } from './infrastructure/cache/cache.module';
import { PersistanceModule } from './infrastructure/persistance/persistance.module';
import { CommentsAggregatorModule } from './application/comments-aggregator/comments-aggregator.module';

@Module({
  imports: [
    AppConfigModule,
    CommentAggregatorCacheModule,
    PersistanceModule,
    CommentsAggregatorModule,
  ],
})
export class AppModule {}
