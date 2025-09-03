import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { LogsModule } from '../logs/logs.module';
import { MeasureModule } from '../measure/measure.module';
import { AppConfigModule } from '../config/config.module';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { AppConfigService } from '../config/config.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [
    LogsModule,
    MeasureModule,
    AppConfigModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.LIKE,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.LIKE_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class LikesModule {}
