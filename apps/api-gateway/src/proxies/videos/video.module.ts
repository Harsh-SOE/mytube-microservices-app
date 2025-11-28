import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';
import { LOGGER_PORT } from '@gateway/application/ports';
import { WinstonLoggerAdapter } from '@gateway/infrastructure/logger';
import { MeasureModule } from '@gateway/infrastructure/measure';

import { VideoService } from './video.service';
import { VideoController } from './video.controller';

@Module({
  controllers: [VideoController],
  imports: [
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
      {
        name: CLIENT_PROVIDER.CHANNEL,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.CHANNEL_SERVICE_OPTIONS,
      },
    ]),
  ],
  providers: [
    VideoService,
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
  ],
})
export class VideoModule {}
