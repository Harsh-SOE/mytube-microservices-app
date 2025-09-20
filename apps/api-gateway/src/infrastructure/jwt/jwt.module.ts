import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { JwtStrategy } from './strategy';
import { AppConfigModule, AppConfigService } from '../config';

@Module({
  imports: [
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.JWT_TOKEN_OPTIONS,
    }),
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
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class GatewayJwtModule {}
