import {
  VideoDomainPublishStatus,
  VideoDomainVisibiltyStatus,
} from '@videos/domain/enums';
import {
  VideoDescription,
  VideoOwner,
  VideoPublish,
  VideoTitle,
  VideoUrl,
  VideoVisibilty,
} from '../../value-objects';

export class VideoEntity {
  public constructor(
    private readonly id: string,
    private title: VideoTitle,
    private readonly videoUrl: VideoUrl,
    private publishStatus: VideoPublish,
    private visibilityStatus: VideoVisibilty,
    private readonly ownerId: VideoOwner,
    private description?: VideoDescription,
  ) {}

  // getters
  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title.getValue();
  }

  public getVideoUrl(): string {
    return this.videoUrl.getValue();
  }

  public getDescription(): string | undefined {
    return this.description?.getValue();
  }

  public getPublishStatus(): VideoDomainPublishStatus {
    return this.publishStatus.getValue();
  }

  public getVisibiltyStatus(): VideoDomainVisibiltyStatus {
    return this.visibilityStatus.getValue();
  }

  public getOwnerId(): string {
    return this.ownerId.getValue();
  }

  public getSnapShot() {
    return {
      id: this.id,
      title: this.title,
      description: this.description?.getValue(),
      videoUrl: this.videoUrl,
      publishStatus: this.publishStatus.getValue(),
      visibilityStatus: this.visibilityStatus.getValue(),
      ownerId: this.ownerId,
    };
  }

  // updates
  public updateTitle(newTitle: string): void {
    this.title = VideoTitle.create(newTitle);
  }

  public updateDescription(newDescription: string): void {
    this.description = VideoDescription.create(newDescription);
  }

  public updatePublishStatus(newStatus: string): void {
    this.publishStatus = VideoPublish.create(newStatus);
  }

  public updateVisibiltyStatus(newVisibiltyStatus: string): void {
    this.visibilityStatus = VideoVisibilty.create(newVisibiltyStatus);
  }
}
