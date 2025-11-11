import {
  VideoRequestPublishStatus,
  VideoRequestVisibilityStatus,
} from '../enums';

export class FoundVideoRequestResponse {
  id: string;
  title: string;
  videoFileIdentifier: string;
  description?: string | undefined;
  videoPublishStatus: VideoRequestPublishStatus;
  videoVisibilityStatus: VideoRequestVisibilityStatus;
}
