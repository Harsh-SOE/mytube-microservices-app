import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENT_PROVIDER } from '@app/clients';
import {
  VideoCommandRepository,
  VideoQueryRepository,
} from '@videos/infrastructure/repository';
import { videoEventHandler } from '@videos/domain/domain-events';
import { VideoAggregateFactory } from '@videos/domain/factories';
import { VideoAggregatePersistanceACL } from '@videos/infrastructure/anti-corruption';
import {
  AppConfigModule,
  AppConfigService,
} from '@videos/infrastructure/config';
import { LogsModule } from '@videos/infrastructure/logs';

import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';

import { videoQueryHandler, QueryModelResponseMapper } from '../queries';
import { videoCommandHandlers } from '../commands';

@Module({
  controllers: [VideosController],
  providers: [
    VideosService,
    VideoCommandRepository,
    VideoAggregateFactory,
    VideoQueryRepository,
    VideoAggregatePersistanceACL,
    QueryModelResponseMapper,
    ...videoCommandHandlers,
    ...videoQueryHandler,
    ...videoEventHandler,
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
