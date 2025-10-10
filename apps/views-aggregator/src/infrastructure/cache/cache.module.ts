import { Module } from '@nestjs/common';

import { AppConfigModule } from '@views-aggregator/infrastructure/config';
import { ViewAggregateFactory } from '@views-aggregator/domain/factories';

import { ViewAggregatorCacheService } from './cache.service';
import { ViewRepository } from '../repository';
import { ViewPeristanceAggregateACL } from '../anti-corruption';

@Module({
  imports: [AppConfigModule],
  providers: [
    ViewAggregatorCacheService,
    ViewAggregateFactory,
    ViewRepository,
    ViewPeristanceAggregateACL,
  ],
  exports: [ViewAggregatorCacheService],
})
export class ViewAggregatorCacheModule {}
