import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  CHANNEL_COMMAND_REPOSITORY,
  CHANNEL_QUERY_REPOSITORY,
  MESSAGE_BROKER,
  STORAGE_PORT,
} from '@channel/application/ports';
import { ChannelCommandHandlers } from '@channel/application/commands';
import { ChannelEventHandler } from '@channel/application/events';
import { ChannelQueryHandler } from '@channel/application/query';
import { PersistanceService } from '@channel/infrastructure/persistance/adapter';
import { AppConfigService } from '@channel/infrastructure/config';
import { ChannelAggregatePersistanceACL } from '@channel/infrastructure/anti-corruption';
import {
  ChannelCommandRepositoryAdapter,
  ChannelQueryRepositoryAdapter,
} from '@channel/infrastructure/repository/adapters';
import { KafkaMessageBrokerAdapter } from '@channel/infrastructure/message-broker/adapters';
import { AwsS3StorageAdapter } from '@channel/infrastructure/storage/adapters';

import { GrpcController } from './grpc.controller';
import { GrpcService } from './grpc.service';

@Module({
  imports: [CqrsModule],
  providers: [
    GrpcService,
    PersistanceService,
    AppConfigService,
    ChannelAggregatePersistanceACL,
    {
      provide: CHANNEL_COMMAND_REPOSITORY,
      useClass: ChannelCommandRepositoryAdapter,
    },
    {
      provide: CHANNEL_QUERY_REPOSITORY,
      useClass: ChannelQueryRepositoryAdapter,
    },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: STORAGE_PORT, useClass: AwsS3StorageAdapter },
    ...ChannelCommandHandlers,
    ...ChannelEventHandler,
    ...ChannelQueryHandler,
  ],
  controllers: [GrpcController],
})
export class GrpcModule {}
