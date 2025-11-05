import { Module } from '@nestjs/common';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
} from '@likes/application/ports';
import {
  AppConfigService,
  AppConfigModule,
} from '@likes/infrastructure/config';
import { RedisCacheAdapter } from '@likes/infrastructure/cache/adapters';
import { LikeRepositoryAdapter } from '@likes/infrastructure/repository/adapters';
import { RedisStreamBufferAdapter } from '@likes/infrastructure/buffer/adapters';
import { LikeActionCommandHandler } from '@likes/application/commands';
import { LikeQueriesHandler } from '@likes/application/queries';

import { LikesController } from './likes.controller';
import { LikeService } from './likes.service';

@Module({
  controllers: [LikesController],
  imports: [AppConfigModule],
  providers: [
    LikeService,
    AppConfigService,
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: DATABASE_PORT, useClass: LikeRepositoryAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    ...LikeActionCommandHandler,
    ...LikeQueriesHandler,
  ],
})
export class LikesModule {}
