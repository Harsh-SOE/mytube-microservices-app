import { ActivateMonitizationCommandHandler } from './activate-monitization-command/activate-monitization.handler';
import { CreateChannelCommandHandler } from './create-channel-command/create-channel.handler';
import { UpdateChannelCommandHandler } from './update-channel-command/update-channel.handler';
import { VerifyChannelHandler } from './verify-channel-command/verify-channel.handler';
import { GeneratePreSignedUrlHandler } from './generate-presigned-url-command/generate-presigned-url.handler';

export const ChannelCommandHandlers = [
  ActivateMonitizationCommandHandler,
  CreateChannelCommandHandler,
  UpdateChannelCommandHandler,
  VerifyChannelHandler,
  GeneratePreSignedUrlHandler,
];

export * from './activate-monitization-command/activate-monitization.command';
export * from './activate-monitization-command/activate-monitization.handler';
export * from './generate-presigned-url-command/generate-presigned-url.command';
export * from './generate-presigned-url-command/generate-presigned-url.handler';
export * from './create-channel-command/create-channel.command';
export * from './create-channel-command/create-channel.handler';
export * from './update-channel-command/update-channel.command';
export * from './update-channel-command/update-channel.handler';
export * from './verify-channel-command/verify-channel.command';
export * from './verify-channel-command/verify-channel.handler';
