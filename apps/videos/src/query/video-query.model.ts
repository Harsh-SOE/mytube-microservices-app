import { VideoQueryPublishStatus } from './enums/video-query-publish-status.enum';
import { VideoQueryVisibiltyStatus } from './enums/video-query-visibility-status.enum';

export class VideoQueryModel {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly videoPublishStatus: VideoQueryPublishStatus,
    public readonly videoVisibilityStatus: VideoQueryVisibiltyStatus,
    public readonly ownerId: string,
    public readonly videoFileIdentifier: string,
    public readonly description?: string | undefined,
  ) {}
}
