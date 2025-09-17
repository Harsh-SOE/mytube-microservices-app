import { VideoCreatedDomainEventHandler } from './video-created.domain-handler';

export const videoEventHandler = [VideoCreatedDomainEventHandler];

export * from './video-created.domain-event';
export * from './video-created.domain-handler';
