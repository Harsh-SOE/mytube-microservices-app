import { IAggregatePersistanceACL } from '@app/infrastructure';
import { CommentAggregate } from '../../../domain/aggregates';
import { Comment } from 'apps/comments-aggregator/generated/prisma';
import { CommentEntity } from '../../../domain/entities';
import { CommentText, UserId, VideoId } from '../../../domain/value-objects';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentAggregatePersistance
  implements
    IAggregatePersistanceACL<
      CommentAggregate,
      Omit<Comment, 'createdAt' | 'updatedAt'>
    >
{
  toAggregate(
    persistance: Omit<Comment, 'createdAt' | 'updatedAt'>,
  ): CommentAggregate {
    const commentEntity = new CommentEntity(
      persistance.id,
      UserId.create(persistance.commentedByUserId),
      VideoId.create(persistance.commentedForVideoId),
      CommentText.create(persistance.commentText),
    );
    return new CommentAggregate(commentEntity);
  }
  toPersistance(
    aggregate: CommentAggregate,
  ): Omit<Comment, 'createdAt' | 'updatedAt'> {
    return {
      id: aggregate.getComment().getId(),
      commentedByUserId: aggregate.getComment().getUserId(),
      commentedForVideoId: aggregate.getComment().getVideoId(),
      commentText: aggregate.getComment().getCommentText(),
    };
  }
}
