import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { AppConfigModule, AppConfigService } from '@users/config';
import { UserCommandHandlers } from '@users/application/commands';
import { UserQueryHandlers } from '@users/application/queries';
import { UserEventHandlers } from '@users/domain/domain-events';
import {
  UserQueryRepository,
  UserCommandRepository,
} from '@users/infrastructure/repository';
import { UserEntityPersistanceACL } from '@users/infrastructure/anti-corruption';
import { PersistanceService } from '@users/infrastructure/persistance';
import { UserAggregateFactory } from '@users/domain/factories';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MeasureModule } from '@users/infrastructure/measure';
import { LogsModule } from '@users/infrastructure/logs';

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
    UserCommandRepository,
    UserQueryRepository,
    UserAggregateFactory,
    UserEntityPersistanceACL,
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
})
export class UserModule {}
