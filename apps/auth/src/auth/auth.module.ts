import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppJwtModule } from '../jwt/jwt.module';
import { LogsModule } from '../logs/logs.module';
import { UserAuthRepository } from '../repository/user-auth.repository';
import { UserAuth, UserAuthSchema } from '../database/schema/user-auth.schema';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { GrpcHealthController } from './grpc-health.controller';

@Module({
  controllers: [AuthController, GrpcHealthController],
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
