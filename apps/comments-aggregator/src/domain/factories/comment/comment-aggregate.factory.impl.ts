import { Injectable } from '@nestjs/common';
import { CommentAggregate } from '../../aggregates';
import { CommentEntity } from '../../entities';
import { CommentText, UserId, VideoId } from '../../value-objects';
import { IAggregateFactory } from './aggregate.factory';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentAggregateFactory
  implements IAggregateFactory<CommentAggregate>
{
  create(
    userId: string,
    videoId: string,
    commentText: string,
  ): CommentAggregate {
    const commentEntity = new CommentEntity(
      uuidv4(),
      UserId.create(userId),
      VideoId.create(videoId),
      CommentText.create(commentText),
    );
    return new CommentAggregate(commentEntity);
  }
}
