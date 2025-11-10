import { EditVideoHandler } from './edit-video-command/edit-video.handler';
import { GeneratePreSignedUrlHandler } from './generate-presigned-url-command';
import { PublishVideoHandler } from './publish-video-command/publish-video.handler';

export const videoCommandHandlers = [
  PublishVideoHandler,
  EditVideoHandler,
  GeneratePreSignedUrlHandler,
];

export * from './publish-video-command/publish-video.handler';
export * from './generate-presigned-url-command';
export * from './publish-video-command/publish-video.command';
export * from './edit-video-command/edit-video.command';
export * from './edit-video-command/edit-video.handler';
