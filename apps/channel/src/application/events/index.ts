import { ChannelCreatedEventHandler } from './channel-created-event/channel-created.handler';
import { ChannelMonitizedEventHandler } from './channel-monitized-event/channel-monitized.handler';
import { ChannelUpdatedEventHandler } from './channel-updated-event/hub-updated.handler';

export const ChannelEventHandler = [
  ChannelCreatedEventHandler,
  ChannelMonitizedEventHandler,
  ChannelUpdatedEventHandler,
];

export * from './channel-created-event/channel-created.event';
export * from './channel-created-event/channel-created.handler';
export * from './channel-monitized-event/channel-monitized.event';
export * from './channel-monitized-event/channel-monitized.handler';
export * from './channel-updated-event/channel-updated.event';
export * from './channel-updated-event/hub-updated.handler';
