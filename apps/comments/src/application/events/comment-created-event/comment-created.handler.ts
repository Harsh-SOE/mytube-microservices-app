import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommentCreatedEvent } from './comment-created.event';

@EventsHandler(CommentCreatedEvent)
export class CommentCreatedEventHandler
  implements IEventHandler<CommentCreatedEvent>
{
  handle(event: CommentCreatedEvent) {
    throw new Error('Method not implemented.');
  }
}
