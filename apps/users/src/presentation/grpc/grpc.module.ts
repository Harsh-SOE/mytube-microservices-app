import { Module } from '@nestjs/common';

import {
  USER_COMMAND_REROSITORY,
  USER_QUERY_REROSITORY,
  MESSAGE_BROKER,
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
import { UserAggregatePersistanceACL } from '@users/infrastructure/anti-corruption';
import { PersistanceService } from '@users/infrastructure/persistance/adapter';
import { KafkaMessageBrokerAdapter } from '@users/infrastructure/message-broker/adapters';

import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';

@Module({
  controllers: [GrpcController],
  imports: [AppConfigModule, MeasureModule],
  providers: [
    GrpcService,
    PersistanceService,
    AppConfigService,
    UserAggregatePersistanceACL,
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
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
})
export class GrpcModule {}
