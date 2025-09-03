import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { AppConfigModule } from '../config/config.module';
import { MeasureModule } from '../measure/measure.module';
import { GatewayJwtModule } from '../jwt/jwt.module';
import { LogsModule } from '../logs/logs.module';
import { CloudController } from './cloud.controller';
import { AppConfigService } from '../config/config.service';
import { CloudService } from './cloud.service';

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
  providers: [CloudService, GatewayJwtModule],
})
export class CloudModule {}
