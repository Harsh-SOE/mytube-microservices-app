export class FoundVideoRequestResponse {
  id: string;
  title: string;
  videoFileUrl: string;
  description?: string | undefined;
  videoPublishStatus: number;
  videoVisibilityStatus: number;
}
