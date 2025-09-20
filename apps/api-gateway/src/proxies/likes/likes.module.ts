import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients/constant';

import { LogsModule } from '@gateway/infrastructure/logs';
import { MeasureModule } from '@gateway/infrastructure/measure';
import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';

import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

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
