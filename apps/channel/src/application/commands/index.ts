import { ActivateMonitizationCommandHandler } from './activate-monitization-command/activate-monitization.handler';
import { CreateChannelCommandHandler } from './create-channel-command/create-channel.handler';
import { UpdateChannelCommandHandler } from './update-channel-command/update-channel.handler';
import { VerifyChannelCommand } from './verify-channel-command/verify-channel.command';

export const ChannelCommandHandlers = [
  ActivateMonitizationCommandHandler,
  CreateChannelCommandHandler,
  UpdateChannelCommandHandler,
  VerifyChannelCommand,
];

export * from './activate-monitization-command/activate-monitization.command';
export * from './activate-monitization-command/activate-monitization.handler';
export * from './create-channel-command/create-channel.command';
export * from './create-channel-command/create-channel.handler';
export * from './update-channel-command/update-channel.command';
export * from './update-channel-command/update-channel.handler';
export * from './verify-channel-command/verify-channel.command';
export * from './verify-channel-command/verify-channel.handler';
