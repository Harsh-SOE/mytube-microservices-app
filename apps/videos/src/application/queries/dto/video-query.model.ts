import {
  GrpcTransportPublishStatus,
  GrpcTransportVisibilityStatus,
} from '@app/contracts/videos';

export class VideoQueryModel {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly videoPublishStatus: GrpcTransportPublishStatus,
    public readonly videoVisibilityStatus: GrpcTransportVisibilityStatus,
    public readonly ownerId: string,
    public readonly videoFileUrl: string,
    public readonly description?: string | undefined,
  ) {}
}
