import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MeasureModule } from '../measure/measure.module';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { LogsModule } from '../logs/logs.module';

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
