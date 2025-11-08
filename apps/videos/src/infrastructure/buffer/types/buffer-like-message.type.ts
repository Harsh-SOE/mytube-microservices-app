import {
  GrpcTransportPublishStatus,
  GrpcTransportVisibilityStatus,
} from '@app/contracts/videos';

export type VideoMessage = {
  id: string;
  ownerId: string;
  videoId: string;
  title: string;
  description: string;
  videoUrl: string;
  publishStatus: GrpcTransportPublishStatus;
  visibilityStatus: GrpcTransportVisibilityStatus;
};
