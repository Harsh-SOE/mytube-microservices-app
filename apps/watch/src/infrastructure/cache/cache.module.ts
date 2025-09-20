import { Module } from '@nestjs/common';

import { WatchCacheService } from './cache.service';

@Module({
  providers: [WatchCacheService],
  exports: [WatchCacheService],
})
export class WatchCacheModule {}
