import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedIntegrationEvent } from './user-created.integration-event';

@EventsHandler(UserCreatedIntegrationEvent)
export class UserCreatedEventIntegrationEventHandler
  implements IEventHandler<UserCreatedIntegrationEvent>
{
  constructor() {}

  handle({ userId }: UserCreatedIntegrationEvent) {
    console.log(`User with id:${userId} was created successfully`);
  }
}
