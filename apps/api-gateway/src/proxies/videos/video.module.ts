import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { MeasureModule } from '@gateway/infrastructure/measure';
import { LogsModule } from '@gateway/infrastructure/logs';
import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';

import { VideoService } from './video.service';
import { VideoController } from './video.controller';

@Module({
  providers: [VideoService],
  controllers: [VideoController],
  imports: [
    MeasureModule,
    LogsModule,
    AppConfigModule,
    MeasureModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.VIDEO,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.VIDEO_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class VideoModule {}
