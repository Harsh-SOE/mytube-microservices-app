import { Module } from '@nestjs/common';

import { VideoService as VideoService } from './videos.service';
import { VideosController as VideosController } from './videos.controller';
import { videoCommandHandlers } from '../commands';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENT_PROVIDER } from '@app/clients';
import { GrpcHealthController } from './grpc-health.controller';
import {
  VideoCommandRepository,
  VideoQueryRepository,
} from '@videos/infrastructure/repository';
import { VideoAggregateFactory } from '@videos/domain/factories/video-aggregate.factory.impl';
import { VideoAggregatePersistanceACL } from '@videos/infrastructure/anti-corruption';
import { videoQueryHandler } from '../queries';
import { LogsModule } from '@users/infrastructure/logs';
import { AppConfigModule, AppConfigService } from '@videos/config';

@Module({
  controllers: [VideosController, GrpcHealthController],
  providers: [
    VideoService,
    VideoCommandRepository,
    VideoAggregateFactory,
    VideoQueryRepository,
    VideoAggregatePersistanceACL,
    ...videoCommandHandlers,
    ...videoQueryHandler,
  ],
  imports: [
    LogsModule,
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.VIDEO_TRANSCODER,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.VIDEO_TRANSCODER_SERVICE_OPTIONS,
      },
    ]),
  ],
})
export class VideosModule {}
