import { ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { MeasureModule } from '../measure/measure.module';
import { LogsModule } from '../logs/logs.module';
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
