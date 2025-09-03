import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { LogsModule } from '../logs/logs.module';
import { AppConfigModule } from '../config/config.module';
import { MeasureModule } from '../measure/measure.module';
import { AuthController } from './auth.controller';
import { AppConfigService } from '../config/config.service';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MeasureModule,
    LogsModule,
    AppConfigModule,
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule],
        inject: [AppConfigService],
        name: CLIENT_PROVIDER.AUTH,
        useFactory: (configService: AppConfigService) =>
          configService.AUTH_SERVICE_OPTIONS,
      },
      {
        imports: [AppConfigModule],
        inject: [AppConfigService],
        name: CLIENT_PROVIDER.SAGA,
        useFactory: (configService: AppConfigService) =>
          configService.SAGA_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class AuthModule {}
