import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedDomainEvent } from './user-updated.domain-event';

@EventsHandler(UserUpdatedDomainEvent)
export class UserUpdatedDomainEventHandler
  implements IEventHandler<UserUpdatedDomainEvent>
{
  handle({ userId }: UserUpdatedDomainEvent) {
    console.log(`User was updated successfully`, userId);
  }
}
