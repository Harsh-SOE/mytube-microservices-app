import { Inject, Injectable } from '@nestjs/common';

import { KafkaLikeMessage } from '@aggregator/types';
import { WINSTON_LOGGER } from '@app/clients';
import winston from 'winston';
import { AggregatorCacheService } from '@aggregator/infrastructure/cache/aggregator-cache.service';

@Injectable()
export class LikesConsumerService {
  public constructor(
    @Inject(WINSTON_LOGGER) private logger: winston.Logger,
    private readonly cacheService: AggregatorCacheService,
  ) {}

  async onLike(message: KafkaLikeMessage) {
    await this.cacheService.bufferLikeMessages(message);
  }
}
