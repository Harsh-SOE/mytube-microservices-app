import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
  LOGGER_PORT,
} from '@views/application/ports';
import { AppConfigModule } from '@views/infrastructure/config';
import { ViewCacheAdapter } from '@views/infrastructure/cache/adapters';
import { ViewRepositoryAdapter } from '@views/infrastructure/repository/adapters';
import { RedisStreamBufferAdapter } from '@views/infrastructure/buffer/adapters';
import { WinstonLoggerAdapter } from '@views/infrastructure/logger';
import { RedisBufferFilter } from '@views/infrastructure/buffer/filters';
import { ViewPeristanceAggregateACL } from '@views/infrastructure/anti-corruption';
import { ViewRepoFilter } from '@views/infrastructure/repository/filters';
import { PersistanceService } from '@views/infrastructure/persistance/adapter';
import { RedisFilter } from '@views/infrastructure/cache/filters';

import { GrpcController } from './grpc.controller';
import { GrpcService } from './grpc.service';

@Module({
  imports: [AppConfigModule, CqrsModule],
  controllers: [GrpcController],
  providers: [
    GrpcService,
    RedisBufferFilter,
    RedisFilter,
    ViewPeristanceAggregateACL,
    ViewRepoFilter,
    PersistanceService,
    { provide: CACHE_PORT, useClass: ViewCacheAdapter },
    { provide: DATABASE_PORT, useClass: ViewRepositoryAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
  ],
})
export class GrpcModule {}
