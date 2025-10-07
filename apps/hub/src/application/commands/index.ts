import { ActivateMonitizationCommandHandler } from './activate-monitization-command/activate-monitization.handler';
import { CreateHubCommandHandler } from './create-hub-command/create-hub.handler';
import { UpdateHubCommandHandler } from './update-hub-command/update-hub.handler';
import { VerifyHubCommand } from './verify-hub-command/verify-hub.command';

export const HubCommandHandlers = [
  ActivateMonitizationCommandHandler,
  CreateHubCommandHandler,
  UpdateHubCommandHandler,
  VerifyHubCommand,
];

export * from './activate-monitization-command/activate-monitization.command';
export * from './activate-monitization-command/activate-monitization.handler';
export * from './create-hub-command/create-hub.command';
export * from './create-hub-command/create-hub.handler';
export * from './update-hub-command/update-hub.command';
export * from './update-hub-command/update-hub.handler';
export * from './verify-hub-command/verify-hub.command';
export * from './verify-hub-command/verify-hub.handler';
