import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { MeasureModule } from '@gateway/infrastructure/measure';
import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';

import { Auth0Strategy, JwtStrategy } from './auth-strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    MeasureModule,
    AppConfigModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        privateKey: configService.JWT_PRIVATE_KEY,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: configService.JWT_ACCESS_TOKEN_EXPIRY,
        },
      }),
    }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.JWT_TOKEN_OPTIONS,
    }),
    PassportModule.register({ defaultStrategy: 'auth0' }),
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
  providers: [AuthService, JwtStrategy, Auth0Strategy],
  exports: [JwtStrategy, Auth0Strategy, JwtModule],
})
export class AuthModule {}
