import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HubCreatedEvent } from './hub-created.event';

@EventsHandler(HubCreatedEvent)
export class HubCreatedEventHandler implements IEventHandler<HubCreatedEvent> {
  handle({ hubCreatedEventDto }: HubCreatedEvent) {
    const hubSnapshot = hubCreatedEventDto.getHubSnapshot();
    console.log(`hub was created: ${JSON.stringify(hubSnapshot)}`);
  }
}
