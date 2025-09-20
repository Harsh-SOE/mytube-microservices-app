import { Module } from '@nestjs/common';

import { AppConfigModule } from '@likes-aggregator/config';
import { LikeAggregateFactory } from '@likes-aggregator/domain/factories';

import { AggregatorCacheService } from './cache.service';
import { LikeRepository } from '../repository';
import { LikePersistanceACL } from '../anti-corruption';
import { LogsModule } from '../logs';

@Module({
  imports: [AppConfigModule, LogsModule],
  providers: [
    AggregatorCacheService,
    LikeRepository,
    LikeAggregateFactory,
    LikePersistanceACL,
  ],
  exports: [AggregatorCacheService],
})
export class AggregatorCacheModule {}
