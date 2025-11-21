import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
  LOGGER_PORT,
  MESSAGE_BROKER,
} from '@reaction/application/ports';
import {
  AppConfigService,
  AppConfigModule,
} from '@reaction/infrastructure/config';
import { RedisCacheAdapter } from '@reaction/infrastructure/cache/adapters';
import { ReactionRepositoryAdapter } from '@reaction/infrastructure/repository/adapters';
import { RedisStreamBufferAdapter } from '@reaction/infrastructure/buffer/adapters';
import { KafkaMessageBrokerAdapter } from '@reaction/infrastructure/message-broker/adapters';
import { LikeActionCommandHandler } from '@reaction/application/commands';
import { LikeQueriesHandler } from '@reaction/application/queries';
import { ReactionPersistanceACL } from '@reaction/infrastructure/anti-corruption';
import { WinstonLoggerAdapter } from '@reaction/infrastructure/logger';
import { RedisFilter } from '@reaction/infrastructure/cache/filters';
import { KafkaMessageHandler } from '@reaction/infrastructure/message-broker/filter';
import { ReactionRepoFilter } from '@reaction/infrastructure/repository/filters';
import { PersistanceService } from '@reaction/infrastructure/persistance/adapter';

import { GrpcController } from './grpc.controller';
import { GrpcService } from './grpc.service';

@Module({
  imports: [AppConfigModule, CqrsModule],
  controllers: [GrpcController],
  providers: [
    GrpcService,
    AppConfigService,
    ReactionPersistanceACL,
    RedisFilter,
    KafkaMessageHandler,
    ReactionRepoFilter,
    PersistanceService,
    { provide: DATABASE_PORT, useClass: ReactionRepositoryAdapter },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
    ...LikeActionCommandHandler,
    ...LikeQueriesHandler,
  ],
})
export class GrpcModule {}
