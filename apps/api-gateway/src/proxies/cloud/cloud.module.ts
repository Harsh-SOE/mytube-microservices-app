import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { LogsModule } from '@gateway/infrastructure/logs';
import { MeasureModule } from '@gateway/infrastructure/measure';
import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';
import { GatewayAuthModule } from '@gateway/infrastructure/passport';

import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';

@Module({
  imports: [
    LogsModule,
    MeasureModule,
    AppConfigModule,
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule],
        inject: [AppConfigService],
        name: CLIENT_PROVIDER.CLOUD,
        useFactory: (configService: AppConfigService) =>
          configService.CLOUD_SERVICE_OPTIONS,
      },
    ]),
  ],
  controllers: [CloudController],
  providers: [CloudService, GatewayAuthModule],
})
export class CloudModule {}
