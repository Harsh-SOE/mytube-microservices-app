import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@nestjs/cqrs';

import { CommentVideoDto, CommentVideoResponse } from '@app/contracts/comments';

import { CreateCommentCommand } from '@comments/application/commands';

@Injectable()
export class CommentsService {
  public constructor(private readonly commandBus: ICommandBus) {}

  public async commentOnVideo(
    commentVideoDto: CommentVideoDto,
  ): Promise<CommentVideoResponse> {
    return this.commandBus.execute<CreateCommentCommand, CommentVideoResponse>(
      new CreateCommentCommand(commentVideoDto),
    );
  }
}
