import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsCacheModule } from '../../infrastructure/cache/cache.module';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENT_PROVIDER } from '@app/clients';
import { AppConfigModule } from '../../config/config.module';
import { AppConfigService } from '../../config/config.service';

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
          configService.COMMENTS_AGGREGATOR_OPTION,
      },
    ]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
