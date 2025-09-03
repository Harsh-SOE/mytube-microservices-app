import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENT_PROVIDER } from '@app/clients/constant';

import { SagaService } from './saga.service';
import { SagaController } from './saga.controller';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { GrpcHealthController } from './grpc-health.controller';
import { LogsModule } from '../logs/logs.module';

@Module({
  controllers: [SagaController, GrpcHealthController],
  providers: [SagaService],
  imports: [
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
        name: CLIENT_PROVIDER.USER,
        useFactory: (configService: AppConfigService) =>
          configService.USER_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class SagaModule {}
