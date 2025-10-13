import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  AppConfigModule,
  AppConfigService,
} from '@comments-aggregator/infrastructure/config';
import { CommentRepository } from '@comments-aggregator/infrastructure/repository';
import {
  CommentAggregatorCacheModule,
  CommentAggregatorCacheService,
} from '@comments-aggregator/infrastructure/cache';
import { PersistanceModule } from '@comments-aggregator/infrastructure/persistance';
import { CommentAggregatePersistance } from '@comments-aggregator/infrastructure/anti-corruption';
import { COMMENT_REPOSITORY } from '@comments-aggregator/application/ports';

import { CommentsAggregatorController } from './comments-aggregator.controller';
import { CommentsAggregatorService } from './comments-aggregator.service';

@Module({
  imports: [
    AppConfigModule,
    PersistanceModule,
    CqrsModule,
    CommentAggregatorCacheModule,
  ],
  providers: [
    CommentsAggregatorService,
    AppConfigService,
    CommentAggregatorCacheService,
    CommentAggregatePersistance,
    {
      provide: COMMENT_REPOSITORY,
      useClass: CommentRepository,
    },
  ],
  controllers: [CommentsAggregatorController],
})
export class CommentsAggregatorModule {}
