import { Module } from '@nestjs/common';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
  MESSAGE_BROKER,
} from '@comments/application/ports';
import { CommentEventHandler } from '@comments/application/events';
import { CommentCommandHandler } from '@comments/application/commands';
import { AppConfigModule } from '@comments/infrastructure/config';
import { PrismaMongoDBRepositoryAdapter } from '@comments/infrastructure/repository/adapters';
import { KafkaMessageBrokerAdapter } from '@comments/infrastructure/message-broker/adapters';
import { RedisStreamBufferAdapter } from '@comments/infrastructure/buffer/adapters';
import { RedisCacheAdapter } from '@comments/infrastructure/cache';

import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';

@Module({
  imports: [AppConfigModule],
  controllers: [GrpcController],
  providers: [
    GrpcService,
    {
      provide: DATABASE_PORT,
      useClass: PrismaMongoDBRepositoryAdapter,
    },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    ...CommentCommandHandler,
    ...CommentEventHandler,
  ],
})
export class GrpcModule {}
