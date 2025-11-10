import {
  VideoGrpcPublishStatus,
  VideoGrpcVisibilityStatus,
} from '@app/contracts/videos';

export class VideoQueryModel {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly videoPublishStatus: VideoGrpcPublishStatus,
    public readonly videoVisibilityStatus: VideoGrpcVisibilityStatus,
    public readonly ownerId: string,
    public readonly videoFileUrl: string,
    public readonly description?: string | undefined,
  ) {}
}
