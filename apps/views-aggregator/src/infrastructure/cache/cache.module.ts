import { Module } from '@nestjs/common';

import { WatchAggregatorCacheService } from './cache.service';
import { AppConfigModule } from '@views-aggregator/config';

@Module({
  imports: [AppConfigModule],
  providers: [WatchAggregatorCacheService],
})
export class WatchAggregatorCachemodule {}
