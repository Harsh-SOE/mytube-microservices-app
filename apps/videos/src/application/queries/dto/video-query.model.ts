import {
  VideoPublishStatus,
  VideoVisibilityStatus,
} from '@app/contracts/videos';

export class VideoQueryModel {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly videoPublishStatus: VideoPublishStatus,
    public readonly videoVisibiltyStatus: VideoVisibilityStatus,
    public readonly ownerId: string,
    public readonly videoFileUrl: string,
    public readonly description?: string | undefined,
  ) {}
}
