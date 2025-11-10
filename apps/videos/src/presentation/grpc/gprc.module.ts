import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients';

import {
  QueryModelResponseMapper,
  videoQueryHandler,
} from '@videos/application/queries';
import { videoCommandHandlers } from '@videos/application/commands';
import { VideoAggregatePersistanceACL } from '@videos/infrastructure/anti-corruption';
import {
  AppConfigModule,
  AppConfigService,
} from '@videos/infrastructure/config';
import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_COMMAND_PORT,
  DATABASE_QUERY_PORT,
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

import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';

@Module({
  controllers: [GrpcController],
  providers: [
    GrpcService,
    VideoQueryRepositoryAdapter,
    VideoAggregatePersistanceACL,
    QueryModelResponseMapper,
    { provide: DATABASE_COMMAND_PORT, useClass: VideoCommandRepositoryAdapter },
    { provide: DATABASE_QUERY_PORT, useClass: VideoQueryRepositoryAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: STORAGE_PORT, useClass: AwsS3StorageAdapter },
    ...videoCommandHandlers,
    ...videoQueryHandler,
  ],
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.VIDEO_TRANSCODER,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.VIDEO_TRANSCODER_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class GrpcModule {}
