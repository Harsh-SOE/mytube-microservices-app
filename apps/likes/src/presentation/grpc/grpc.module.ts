import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
  LOGGER_PORT,
  MESSAGE_BROKER,
} from '@likes/application/ports';
import {
  AppConfigService,
  AppConfigModule,
} from '@likes/infrastructure/config';
import { RedisCacheAdapter } from '@likes/infrastructure/cache/adapters';
import { LikeRepositoryAdapter } from '@likes/infrastructure/repository/adapters';
import { RedisStreamBufferAdapter } from '@likes/infrastructure/buffer/adapters';
import { KafkaMessageBrokerAdapter } from '@likes/infrastructure/message-broker/adapters';
import { LikeActionCommandHandler } from '@likes/application/commands';
import { LikeQueriesHandler } from '@likes/application/queries';
import { LikePersistanceACL } from '@likes/infrastructure/anti-corruption';
import { WinstonLoggerAdapter } from '@likes/infrastructure/logger';
import { RedisFilter } from '@likes/infrastructure/cache/filters';
import { KafkaMessageHandler } from '@likes/infrastructure/message-broker/filter';
import { LikeRepoFilter } from '@likes/infrastructure/repository/filters';
import { PersistanceService } from '@likes/infrastructure/persistance/adapter';

import { LikesController } from './grpc.controller';
import { LikeService } from './grpc.service';

@Module({
  imports: [AppConfigModule, CqrsModule],
  controllers: [LikesController],
  providers: [
    LikeService,
    AppConfigService,
    LikePersistanceACL,
    RedisFilter,
    KafkaMessageHandler,
    LikeRepoFilter,
    PersistanceService,
    { provide: DATABASE_PORT, useClass: LikeRepositoryAdapter },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
    ...LikeActionCommandHandler,
    ...LikeQueriesHandler,
  ],
})
export class LikesModule {}
