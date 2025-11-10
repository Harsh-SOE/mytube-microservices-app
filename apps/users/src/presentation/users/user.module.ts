import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import {
  AppConfigModule,
  AppConfigService,
} from '@users/infrastructure/config';
import { UserCommandHandlers } from '@users/application/commands';
import { MeasureModule } from '@users/infrastructure/measure';
import { UserQueryHandlers } from '@users/application/queries';
import { UserEventHandlers } from '@users/application/events';
import { LogsModule } from '@users/infrastructure/logger';
import {
  UserQueryRepository,
  UserCommandRepository,
} from '@users/infrastructure/repository';
import { MESSAGE_BROKER } from '@users/application/ports/message-broker';
import { UserAggregatePersistanceACL } from '@users/infrastructure/anti-corruption';
import { PersistanceService } from '@users/infrastructure/persistance';
import { MessageBrokerService } from '@users/infrastructure/message-broker';
import {
  USER_COMMAND_REROSITORY,
  USER_QUERY_REROSITORY,
} from '@users/application/ports/repository';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [
    AppConfigModule,
    CqrsModule,
    MeasureModule,
    LogsModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.EMAIL,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.EMAIL_SERVICE_OPTIONS,
      },
      {
        name: CLIENT_PROVIDER.WATCH,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.WATCH_SERVICE_OPTIONS,
      },
    ]),
  ],
  providers: [
    UserService,
    PersistanceService,
    AppConfigService,
    UserAggregatePersistanceACL,
    {
      provide: USER_COMMAND_REROSITORY,
      useClass: UserCommandRepository,
    },
    {
      provide: USER_QUERY_REROSITORY,
      useClass: UserQueryRepository,
    },
    {
      provide: MESSAGE_BROKER,
      useClass: MessageBrokerService,
    },
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
})
export class UserModule {}
