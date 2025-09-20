import { Injectable } from '@nestjs/common';
import { ViewAggregatorCacheService } from '@views-aggregator/infrastructure/cache';

import { WatchMessage } from '@views-aggregator/types';

@Injectable()
export class ViewsConsumerService {
  constructor(private readonly cacheService: ViewAggregatorCacheService) {}

  async onWatch(message: WatchMessage) {
    console.log(`Messsage is`, message);
    await this.cacheService.bufferWatchMessage(message);
  }
}
