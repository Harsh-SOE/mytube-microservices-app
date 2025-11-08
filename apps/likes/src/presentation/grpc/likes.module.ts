import { Module } from '@nestjs/common';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
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

import { LikesController } from './likes.controller';
import { LikeService } from './likes.service';

@Module({
  imports: [AppConfigModule],
  controllers: [LikesController],
  providers: [
    LikeService,
    AppConfigService,
    { provide: DATABASE_PORT, useClass: LikeRepositoryAdapter },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    ...LikeActionCommandHandler,
    ...LikeQueriesHandler,
  ],
})
export class LikesModule {}
