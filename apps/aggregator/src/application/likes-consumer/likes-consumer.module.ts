import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { AppConfigModule, AppConfigService } from '@aggregator/config';
import { PersistanceModule } from '@aggregator/infrastructure/persistance';
import { LikeAggregateFactory } from '@aggregator/domain/factories';

import { LikesConsumerService } from './likes-consumer.service';
import { LikesConsumerController } from './likes-consumer.controller';
import { LikePersistanceACL } from '@aggregator/infrastructure/anti-corruption';
import { LikeRepository } from '@aggregator/infrastructure/repository';

@Module({
  controllers: [LikesConsumerController],
  imports: [AppConfigModule, PersistanceModule, CqrsModule],
  providers: [
    LikesConsumerService,
    AppConfigService,
    LikeAggregateFactory,
    LikePersistanceACL,
    LikeRepository,
  ],
})
export class LikesConsumerModule {}
