import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedDomainEvent } from './user-created.domain-event';

@EventsHandler(UserCreatedDomainEvent)
export class UserCreatedDomainEventHandler
  implements IEventHandler<UserCreatedDomainEvent>
{
  handle({ userId }: UserCreatedDomainEvent) {
    console.log(`User was created...`, userId);
  }
}
