import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import {
  USER_COMMAND_REROSITORY,
  USER_QUERY_REROSITORY,
  MESSAGE_BROKER,
  LOGGER_PORT,
  STORAGE_PORT,
} from '@users/application/ports';
import {
  AppConfigModule,
  AppConfigService,
} from '@users/infrastructure/config';
import { UserCommandHandlers } from '@users/application/commands';
import { UserQueryHandlers } from '@users/application/queries';
import { UserEventHandlers } from '@users/application/events';
import { MeasureModule } from '@users/infrastructure/measure';
import {
  UserQueryRepositoryAdapter,
  UserCommandRepositoryAdapter,
} from '@users/infrastructure/repository/adapters';
import {
  UserAggregatePersistanceACL,
  UserQueryPersistanceACL,
} from '@users/infrastructure/anti-corruption';
import { PersistanceService } from '@users/infrastructure/persistance/adapter';
import { KafkaMessageBrokerAdapter } from '@users/infrastructure/message-broker/adapters';
import { KafkaMessageHandler } from '@users/infrastructure/message-broker/filter';
import { WinstonLoggerAdapter } from '@users/infrastructure/logger';
import { UserRepoFilter } from '@users/infrastructure/repository/filters';
import { AwsS3StorageAdapter } from '@users/infrastructure/storage/adapters';

import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';

@Module({
  imports: [AppConfigModule, MeasureModule, CqrsModule],
  controllers: [GrpcController],
  providers: [
    GrpcService,
    PersistanceService,
    AppConfigService,
    UserAggregatePersistanceACL,
    UserQueryPersistanceACL,
    KafkaMessageHandler,
    UserRepoFilter,
    {
      provide: USER_COMMAND_REROSITORY,
      useClass: UserCommandRepositoryAdapter,
    },
    {
      provide: USER_QUERY_REROSITORY,
      useClass: UserQueryRepositoryAdapter,
    },
    {
      provide: MESSAGE_BROKER,
      useClass: KafkaMessageBrokerAdapter,
    },
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
    { provide: STORAGE_PORT, useClass: AwsS3StorageAdapter },
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
})
export class GrpcModule {}
