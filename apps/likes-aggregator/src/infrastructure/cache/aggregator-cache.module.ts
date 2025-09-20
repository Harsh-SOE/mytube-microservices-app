import { Module } from '@nestjs/common';

import { AggregatorCacheService } from './aggregator-cache.service';
import { AppConfigModule } from '@likes-aggregator/config';
import { LikeRepository } from '../repository';
import { LikeAggregateFactory } from '@likes-aggregator/domain/factories';
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
