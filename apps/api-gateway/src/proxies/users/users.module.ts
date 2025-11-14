import { ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';
import { MeasureModule } from '@gateway/infrastructure/measure';
import { LOGGER_PORT } from '@gateway/application/ports';
import { WinstonLoggerAdapter } from '@gateway/infrastructure/logger';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersService,
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
  ],
  controllers: [UsersController],
  imports: [
    AppConfigModule,
    MeasureModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.USER,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.USER_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class UsersModule {}
