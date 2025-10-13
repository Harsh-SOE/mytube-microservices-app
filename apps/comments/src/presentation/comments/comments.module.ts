import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients';

import { CommentsCacheModule } from '@comments/infrastructure/cache';
import {
  AppConfigModule,
  AppConfigService,
} from '@comments/infrastructure/config';

import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    CommentsCacheModule,
    AppConfigModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.COMMENTS_AGGREGATOR,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.COMMENTS_AGGREGATOR_SERVICE_OPTIONS,
      },
    ]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
