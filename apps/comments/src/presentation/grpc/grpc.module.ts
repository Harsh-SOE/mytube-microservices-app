import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
  LOGGER_PORT,
  MESSAGE_BROKER,
} from '@comments/application/ports';
import { CommentEventHandler } from '@comments/application/events';
import { CommentCommandHandler } from '@comments/application/commands';
import { AppConfigModule } from '@comments/infrastructure/config';
import { PrismaMongoDBRepositoryAdapter } from '@comments/infrastructure/repository/adapters';
import { KafkaMessageBrokerAdapter } from '@comments/infrastructure/message-broker/adapters';
import { RedisStreamBufferAdapter } from '@comments/infrastructure/buffer/adapters';
import {
  RedisCacheAdapter,
  RedisCacheFilter,
} from '@comments/infrastructure/cache';
import { WinstonLoggerAdapter } from '@comments/infrastructure/logger';
import { RedisBufferFilter } from '@comments/infrastructure/buffer/filters';
import { KafkaMessageBrokerFilter } from '@comments/infrastructure/message-broker/filter';
import { PersistanceService } from '@comments/infrastructure/persistance/adapter';
import { CommentsRepoFilter } from '@comments/infrastructure/repository/filters';
import { CommentAggregatePersistance } from '@comments/infrastructure/anti-corruption';

import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AppConfigModule, CqrsModule, ScheduleModule.forRoot()],
  controllers: [GrpcController],
  providers: [
    GrpcService,
    RedisBufferFilter,
    RedisCacheFilter,
    KafkaMessageBrokerFilter,
    PersistanceService,
    CommentsRepoFilter,
    CommentAggregatePersistance,
    {
      provide: DATABASE_PORT,
      useClass: PrismaMongoDBRepositoryAdapter,
    },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    {
      provide: LOGGER_PORT,
      useClass: WinstonLoggerAdapter,
    },
    ...CommentCommandHandler,
    ...CommentEventHandler,
  ],
})
export class GrpcModule {}
