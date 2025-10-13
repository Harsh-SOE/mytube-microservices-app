import { Module } from '@nestjs/common';

import { AppConfigModule } from '@comments-aggregator/infrastructure/config';
import { CommentRepository } from '@comments-aggregator/infrastructure/repository';
import { CommentAggregatePersistance } from '@comments-aggregator/infrastructure/anti-corruption';
import { COMMENT_REPOSITORY } from '@comments-aggregator/application/ports';

import { CommentAggregatorCacheService } from './cache.service';

@Module({
  imports: [AppConfigModule],
  providers: [
    CommentAggregatorCacheService,
    CommentAggregatePersistance,
    {
      provide: COMMENT_REPOSITORY,
      useClass: CommentRepository,
    },
  ],
  exports: [CommentAggregatorCacheService],
})
export class CommentAggregatorCacheModule {}
