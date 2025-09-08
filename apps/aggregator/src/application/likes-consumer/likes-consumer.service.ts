import { Inject, Injectable } from '@nestjs/common';
import winston from 'winston';

import { KafkaLikeMessage } from '@aggregator/types';
import { AggregatorCacheService } from '@aggregator/infrastructure/cache';

import { WINSTON_LOGGER } from '@app/clients';

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
