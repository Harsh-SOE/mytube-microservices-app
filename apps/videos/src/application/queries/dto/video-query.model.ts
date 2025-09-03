import {
  VideoTransportPublishStatus,
  VideoTransportVisibilityStatus,
} from '@app/contracts/videos';

export class VideoQueryModel {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly videoPublishStatus: VideoTransportPublishStatus,
    public readonly videoVisibilityStatus: VideoTransportVisibilityStatus,
    public readonly ownerId: string,
    public readonly videoFileUrl: string,
    public readonly description?: string | undefined,
  ) {}
}
