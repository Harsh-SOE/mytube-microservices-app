import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../infrastructure/config/config.module';
import { CommentAggregatorCacheModule } from '../../infrastructure/cache/cache.module';
import { PersistanceModule } from '../../infrastructure/persistance/persistance.module';
import { CommentAggregatorCacheService } from '../../infrastructure/cache/cache.service';
import { CommentsAggregatorController } from './comments-aggregator.controller';
import { CommentsAggregatorService } from './comments-aggregator.service';
import { CqrsModule } from '@nestjs/cqrs';
import { AppConfigService } from '../../infrastructure/config/config.service';
import { CommentAggregateFactory } from '../../domain/factories';
import { CommentAggregatePersistance } from '../../infrastructure/anti-corruption/comment';
import { CommentRepo } from '../../infrastructure/repository/comment.repo.impl';

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
    CommentAggregateFactory,
    CommentAggregatePersistance,
    CommentRepo,
  ],
  controllers: [CommentsAggregatorController],
})
export class CommentsAggregatorModule {}
