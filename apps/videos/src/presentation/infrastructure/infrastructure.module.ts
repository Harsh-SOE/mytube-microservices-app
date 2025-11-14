import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  AppConfigModule,
  AppConfigService,
} from '@videos/infrastructure/config';
import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_COMMAND_PORT,
  DATABASE_QUERY_PORT,
  LOGGER_PORT,
  MESSAGE_BROKER,
  STORAGE_PORT,
} from '@videos/application/ports';
import {
  VideoCommandRepositoryAdapter,
  VideoQueryRepositoryAdapter,
} from '@videos/infrastructure/repository/adapters';
import { RedisStreamBufferAdapter } from '@videos/infrastructure/buffer/adapters';
import { KafkaMessageBrokerAdapter } from '@videos/infrastructure/message-broker/adapters';
import { RedisCacheAdapter } from '@videos/infrastructure/cache/adapters';
import { AwsS3StorageAdapter } from '@videos/infrastructure/storage/adapters';
import { WinstonLoggerAdapter } from '@videos/infrastructure/logger';
import { RedisBufferFilter } from '@videos/infrastructure/buffer/filters';
import { RedisFilter } from '@videos/infrastructure/cache/filters';
import { PersistanceService } from '@videos/infrastructure/persistance/adapter';
import { VideoRepoFilter } from '@videos/infrastructure/repository/filters';
import { KafkaMessageHandler } from '@videos/infrastructure/message-broker/filter';
import {
  VideoAggregatePersistanceACL,
  VideoQueryPeristanceACL,
} from '@videos/infrastructure/anti-corruption';

@Global()
@Module({
  imports: [CqrsModule, AppConfigModule],
  providers: [
    VideoAggregatePersistanceACL,
    VideoQueryPeristanceACL,
    RedisBufferFilter,
    RedisFilter,
    KafkaMessageHandler,
    AppConfigService,
    PersistanceService,
    VideoRepoFilter,
    { provide: DATABASE_COMMAND_PORT, useClass: VideoCommandRepositoryAdapter },
    { provide: DATABASE_QUERY_PORT, useClass: VideoQueryRepositoryAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: STORAGE_PORT, useClass: AwsS3StorageAdapter },
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
  ],
  exports: [
    VideoAggregatePersistanceACL,
    VideoQueryPeristanceACL,
    RedisBufferFilter,
    RedisFilter,
    KafkaMessageHandler,
    AppConfigService,
    PersistanceService,
    VideoRepoFilter,
    LOGGER_PORT,
    BUFFER_PORT,
    CACHE_PORT,
    MESSAGE_BROKER,
    STORAGE_PORT,
    DATABASE_COMMAND_PORT,
    DATABASE_QUERY_PORT,
  ],
})
export class InfrastructureModule {}
