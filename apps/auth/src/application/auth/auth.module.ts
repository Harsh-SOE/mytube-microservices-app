import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { UserAuthRepository } from '@auth/infrastructure/repository';
import { AppJwtModule } from '@auth/infrastructure/jwt';
import { LogsModule } from '@auth/infrastructure/logs';
import { AppConfigModule, AppConfigService } from '@auth/infrastructure/config';
import { UserAuth, UserAuthSchema } from '@auth/infrastructure/persistance';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserAuthRepository],
  imports: [
    AppJwtModule,
    LogsModule,
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule],
        inject: [AppConfigService],
        name: CLIENT_PROVIDER.USER,
        useFactory: (configService: AppConfigService) =>
          configService.USER_CLIENT_OPTIONS,
      },
    ]),
    MongooseModule.forFeature([
      { name: UserAuth.name, schema: UserAuthSchema, collection: 'auth-users' },
    ]),
  ],
})
export class AuthModule {}
