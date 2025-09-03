import {
  VideoRequestPublishStatus,
  VideoRequestVisibilityStatus,
} from '../enums';

export class FoundVideoRequestResponse {
  id: string;
  title: string;
  videoFileUrl: string;
  description?: string | undefined;
  videoPublishStatus: VideoRequestPublishStatus;
  videoVisibilityStatus: VideoRequestVisibilityStatus;
}
