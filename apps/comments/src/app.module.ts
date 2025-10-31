import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { AppHealthModule } from './infrastructure/health';
import { CommentsModule } from './presentation/grpc';
import {
  BUFFER_PORT,
  CACHE_PORT,
  COMMENT_REPOSITORY,
  LOGGER_PORT,
  MESSAGE_BROKER,
} from './application/ports';
import { WinstonLoggerAdapter } from './infrastructure/logger';
import { PrismaRepositoryAdapter } from './infrastructure/repository';
import { RedisCacheAdapter } from './infrastructure/cache';
import { KafkaMessageBrokerAdapter } from './infrastructure/message-broker/adapters';
import { RedisStreamBufferAdapter } from './infrastructure/buffer/adapters';

@Module({
  imports: [AppConfigModule, CommentsModule, AppHealthModule, AppConfigModule],
  providers: [
    {
      provide: LOGGER_PORT,
      useClass: WinstonLoggerAdapter,
    },
    {
      provide: COMMENT_REPOSITORY,
      useClass: PrismaRepositoryAdapter,
    },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
  ],
})
export class AppModule {}
