import { FindVideoHandler } from './find-video-query/find-video.handler';
import { QueryVideoHandler } from './query-video/query-video.handler';

export const videoQueryHandler = [FindVideoHandler, QueryVideoHandler];

export * from './find-video-query/find-video.handler';
export * from './find-video-query/find-video.query';
export * from './query-video/query-video.handler';
export * from './query-video/query-video.query';
