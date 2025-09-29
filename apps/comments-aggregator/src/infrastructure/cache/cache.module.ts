import { Module } from '@nestjs/common';
import { CommentAggregatorCacheService } from './cache.service';
import { AppConfigModule } from '../config/config.module';
import { CommentRepo } from '../repository/comment.repo.impl';
import { CommentAggregateFactory } from '../../domain/factories';
import { CommentAggregatePersistance } from '../anti-corruption/comment';

@Module({
  imports: [AppConfigModule],
  providers: [
    CommentAggregatorCacheService,
    CommentRepo,
    CommentAggregateFactory,
    CommentAggregatorCacheService,
    CommentAggregatePersistance,
  ],
  exports: [CommentAggregatorCacheService],
})
export class CommentAggregatorCacheModule {}
