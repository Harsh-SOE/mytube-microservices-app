import { Inject, Injectable } from '@nestjs/common';
import winston from 'winston';

import { LikeMessage } from '@likes-aggregator/types';
import { AggregatorCacheService } from '@likes-aggregator/infrastructure/cache';

import { WINSTON_LOGGER } from '@app/clients';

@Injectable()
export class LikesConsumerService {
  public constructor(
    @Inject(WINSTON_LOGGER) private logger: winston.Logger,
    private readonly cacheService: AggregatorCacheService,
  ) {}

  async onLike(message: LikeMessage) {
    await this.cacheService.bufferLikeMessages(message);
  }
}
