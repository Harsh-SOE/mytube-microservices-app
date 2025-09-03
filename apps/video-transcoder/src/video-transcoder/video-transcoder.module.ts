import { Module } from '@nestjs/common';
import { VideoTranscoderService } from './video-transcoder.service';
import { VideoTranscoderController } from './video-transcoder.controller';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENT_PROVIDER } from '@app/clients/constant';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { LogsModule } from '../logs';

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
