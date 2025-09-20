import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { AppConfigModule, AppConfigService } from '@likes-aggregator/config';
import { PersistanceModule } from '@likes-aggregator/infrastructure/persistance';
import { LikeAggregateFactory } from '@likes-aggregator/domain/factories';
import { LikePersistanceACL } from '@likes-aggregator/infrastructure/anti-corruption';
import { LikeRepository } from '@likes-aggregator/infrastructure/repository';
import { LogsModule } from '@likes-aggregator/infrastructure/logs';
import { AggregatorCacheModule } from '@likes-aggregator/infrastructure/cache';

import { LikesConsumerService } from './likes-consumer.service';
import { LikesConsumerController } from './likes-consumer.controller';

@Module({
  controllers: [LikesConsumerController],
  imports: [
    AppConfigModule,
    PersistanceModule,
    CqrsModule,
    LogsModule,
    AggregatorCacheModule,
  ],
  providers: [
    LikesConsumerService,
    AppConfigService,
    LikeAggregateFactory,
    LikePersistanceACL,
    LikeRepository,
  ],
})
export class LikesConsumerModule {}
