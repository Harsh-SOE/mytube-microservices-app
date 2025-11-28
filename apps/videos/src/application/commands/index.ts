import { EditVideoHandler } from './edit-video-command/edit-video.handler';
import { GeneratePreSignedUrlThumbnailHandler } from './generate-presigned-url-thumbnail-command';
import { GeneratePreSignedUrlVideoHandler } from './generate-presigned-url-video-command';
import { PublishVideoHandler } from './publish-video-command/publish-video.handler';

export const videoCommandHandlers = [
  PublishVideoHandler,
  EditVideoHandler,
  GeneratePreSignedUrlVideoHandler,
  GeneratePreSignedUrlThumbnailHandler,
];

export * from './publish-video-command/publish-video.handler';
export * from './generate-presigned-url-video-command';
export * from './publish-video-command/publish-video.command';
export * from './edit-video-command/edit-video.command';
export * from './edit-video-command/edit-video.handler';
export * from './generate-presigned-url-thumbnail-command/generate-presigned-url-thumbnail.command';
export * from './generate-presigned-url-thumbnail-command/generate-presigned-url-thumbnail.handler';
