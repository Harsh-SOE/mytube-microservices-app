import { UserCreatedDomainEventHandler } from './user-created-event/user-created.domain-event-handler';
import { UserUpdatedDomainEventHandler } from './user-updated-event/user-updated.domain-event-handler';

export const UserEventHandlers = [
  UserCreatedDomainEventHandler,
  UserUpdatedDomainEventHandler,
];

export * from './user-created-event/user-created.domain-event-handler';
export * from './user-created-event/user-created.domain-event';
export * from './user-updated-event/user-updated.domain-event-handler';
export * from './user-updated-event/user-updated.domain-event';
