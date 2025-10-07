import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { Auth0Strategy, JwtStrategy } from './strategies';
import { AppConfigModule, AppConfigService } from '../config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AppConfigModule,
    PassportModule.register({ defaultStrategy: 'auth0' }), // <<< register passport
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
  providers: [JwtStrategy, Auth0Strategy],
  exports: [JwtStrategy, Auth0Strategy],
})
export class GatewayAuthModule {}
