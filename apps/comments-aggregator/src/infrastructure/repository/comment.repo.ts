import { AggregateRoot } from '@nestjs/cqrs';

export interface ICommentRepo<
  TCommandModel extends AggregateRoot,
  TPersistance,
> {
  saveAComment(model: TCommandModel): Promise<TPersistance>;

  saveManyComments(model: TCommandModel[]): Promise<number>;
}
