import { EditVideoHandler } from './edit-video-command/edit-video.handler';
import { PublishVideoHandler } from './publish-video-command/publish-video.handler';

export const videoCommandHandlers = [PublishVideoHandler, EditVideoHandler];

export * from './publish-video-command/publish-video.handler';
export * from './publish-video-command/publish-video.command';
export * from './edit-video-command/edit-video.command';
export * from './edit-video-command/edit-video.handler';
