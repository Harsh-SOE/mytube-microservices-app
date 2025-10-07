import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { MeasureModule } from '@gateway/infrastructure/measure';
import { LogsModule } from '@gateway/infrastructure/logs';
import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';
import { GatewayAuthModule } from '@gateway/infrastructure/auth';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MeasureModule,
    LogsModule,
    AppConfigModule,
    GatewayAuthModule,
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule],
        inject: [AppConfigService],
        name: CLIENT_PROVIDER.USER,
        useFactory: (configService: AppConfigService) =>
          configService.USER_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class AuthModule {}
