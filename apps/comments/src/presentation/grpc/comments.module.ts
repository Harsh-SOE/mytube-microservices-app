import { Module } from '@nestjs/common';

import { AppConfigModule } from '@comments/infrastructure/config';
import { CommentCommandHandler } from '@comments/application/commands';
import { CommentEventHandler } from '@comments/application/events';

import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [AppConfigModule],
  providers: [
    CommentsService,
    ...CommentCommandHandler,
    ...CommentEventHandler,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
