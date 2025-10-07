import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HubMonitizedEvent } from './hub-monitized.event';

@EventsHandler(HubMonitizedEvent)
export class HubMonitizedEventHandler
  implements IEventHandler<HubMonitizedEvent>
{
  handle({ hubAggregate }: HubMonitizedEvent) {
    const hub = hubAggregate.getHubSnapshot();
    console.log(`Channel monitized: ${JSON.stringify(hub)}`);
  }
}
