import {
  VideoDomainPublishStatus,
  VideoDomainVisibiltyStatus,
} from '@videos/domain/enums';

export type VideoMessage = {
  id: string;
  ownerId: string;
  videoId: string;
  title: string;
  description: string;
  videoUrl: string;
  publishStatus: VideoDomainPublishStatus;
  visibilityStatus: VideoDomainVisibiltyStatus;
};
