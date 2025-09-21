import { AggregateRoot } from '@nestjs/cqrs';
import { CommentEntity } from '../../entities';

export class CommentAggregate extends AggregateRoot {
  public constructor(private comment: CommentEntity) {
    super();
  }

  public getComment() {
    return this.comment;
  }

  public getSnapshot() {
    return this.comment.getSnapshot();
  }
}
