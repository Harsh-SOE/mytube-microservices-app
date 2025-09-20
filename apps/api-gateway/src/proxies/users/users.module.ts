import { ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';
import { MeasureModule } from '@gateway/infrastructure/measure';
import { LogsModule } from '@gateway/infrastructure/logs';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    AppConfigModule,
    MeasureModule,
    LogsModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.USER,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.USER_SERVICE_OPTIONS,
      },
      {
        name: CLIENT_PROVIDER.AUTH,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.AUTH_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class UsersModule {}
