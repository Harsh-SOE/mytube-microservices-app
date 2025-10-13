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
import { UserEventHandlers } from '@users/domain/events';
import { LogsModule } from '@users/infrastructure/logs';
import {
  UserQueryRepository,
  UserCommandRepository,
} from '@users/infrastructure/repository';
import { UserAggregatePersistanceACL } from '@users/infrastructure/anti-corruption';
import { PersistanceService } from '@users/infrastructure/persistance';
import {
  USER_COMMAND_REROSITORY,
  USER_QUERY_REROSITORY,
} from '@users/application/ports';

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
    ]),
  ],
  providers: [
    UserService,
    PersistanceService,
    AppConfigService,
    {
      provide: USER_COMMAND_REROSITORY,
      useClass: UserCommandRepository,
    },
    {
      provide: USER_QUERY_REROSITORY,
      useClass: UserQueryRepository,
    },
    UserAggregatePersistanceACL,
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
})
export class UserModule {}
