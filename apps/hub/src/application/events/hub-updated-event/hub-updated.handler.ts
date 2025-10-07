import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HubUpdatedEvent } from './hub-updated.event';

@EventsHandler(HubUpdatedEvent)
export class HubUpdatedEventHandler implements IEventHandler<HubUpdatedEvent> {
  handle({ hubAggregate }: HubUpdatedEvent) {
    const hub = hubAggregate.getHubSnapshot();
    console.log(`Channel updated: ${JSON.stringify(hub)}`);
  }
}
