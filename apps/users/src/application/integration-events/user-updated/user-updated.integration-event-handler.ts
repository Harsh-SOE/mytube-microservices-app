import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedIntegrationEvent } from './user-updated.integration-event';

@EventsHandler(UserUpdatedIntegrationEvent)
export class UserUpdatedIntegrationEventHandler
  implements IEventHandler<UserUpdatedIntegrationEvent>
{
  handle({ userId }: UserUpdatedIntegrationEvent) {
    console.log(`User was updated successfully`, userId);
  }
}
