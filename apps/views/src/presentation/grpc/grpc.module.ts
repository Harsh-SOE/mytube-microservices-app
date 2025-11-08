import { Module } from '@nestjs/common';

import { AppConfigModule } from '@views/infrastructure/config';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
} from '@views/application/ports';
import { ViewCacheAdapter } from '@views/infrastructure/cache/adapters';
import { ViewRepositoryAdapter } from '@views/infrastructure/repository/adapters';
import { RedisStreamBufferAdapter } from '@views/infrastructure/buffer/adapters';

import { GrpcController } from './grpc.controller';
import { GrpcService } from './grpc.service';

@Module({
  imports: [AppConfigModule],
  controllers: [GrpcController],
  providers: [
    GrpcService,
    { provide: CACHE_PORT, useClass: ViewCacheAdapter },
    { provide: DATABASE_PORT, useClass: ViewRepositoryAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
  ],
})
export class GrpcModule {}
