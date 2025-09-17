import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { LogsModule } from '@transcoder/infrastructure/logs';
import {
  AppConfigModule,
  AppConfigService,
} from '@transcoder/infrastructure/config';

import { VideoTranscoderService } from './video-transcoder.service';
import { VideoTranscoderController } from './video-transcoder.controller';

@Module({
  controllers: [VideoTranscoderController],
  providers: [VideoTranscoderService],
  imports: [
    LogsModule,
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
})
export class VideoTranscoderModule {}
