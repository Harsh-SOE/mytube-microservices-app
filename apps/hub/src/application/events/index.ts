import { HubCreatedEventHandler } from './hub-created-event/hub-created.handler';
import { HubMonitizedEventHandler } from './hub-monitized-event/hub-monitized.handler';
import { HubUpdatedEventHandler } from './hub-updated-event/hub-updated.handler';

export const HubEventHandler = [
  HubCreatedEventHandler,
  HubMonitizedEventHandler,
  HubUpdatedEventHandler,
];

export * from './hub-created-event/hub-created.event';
export * from './hub-created-event/hub-created.handler';
export * from './hub-monitized-event/hub-monitized.event';
export * from './hub-monitized-event/hub-monitized.handler';
export * from './hub-updated-event/hub-updated.event';
export * from './hub-updated-event/hub-updated.handler';
