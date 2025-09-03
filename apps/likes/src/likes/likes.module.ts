import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { LogsModule } from '@likes/logs';
import { AppConfigService, AppConfigModule } from '@likes/config';

import { CLIENT_PROVIDER } from '@app/clients';

import { LikesController } from './likes.controller';
import { LikeService } from './likes.service';
import { GrpcHealthController } from './grpc-health.controller';
import { VideoCacheModule } from '@likes/cache';

@Module({
  controllers: [LikesController, GrpcHealthController],
  imports: [
    LogsModule,
    AppConfigModule,
    VideoCacheModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.AGGREGATOR,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.AGGREGATOR_SERVICE_OPTIONS,
      },
    ]),
  ],
  providers: [LikeService, AppConfigService],
})
export class LikesModule {}
