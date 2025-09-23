import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';
import { CLIENT_PROVIDER } from '@app/clients';
import { ClientsModule } from '@nestjs/microservices';
import { MeasureModule } from '@gateway/infrastructure/measure';
import { LogsModule } from '@gateway/infrastructure/logs';

@Module({
  imports: [
    AppConfigModule,
    MeasureModule,
    LogsModule,
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule],
        inject: [AppConfigService],
        name: CLIENT_PROVIDER.COMMENTS,
        useFactory: (configService: AppConfigService) =>
          configService.COMMENT_SERVICE_OPTIONS,
      },
    ]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
