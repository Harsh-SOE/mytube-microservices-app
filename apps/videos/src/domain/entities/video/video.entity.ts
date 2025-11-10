import {
  VideoDomainPublishStatus,
  VideoDomainVisibiltyStatus,
} from '@videos/domain/enums';

import {
  VideoDescription,
  VideoOwner,
  VideoTitle,
  VideoFileIdentifier,
  VideoVisibilty,
  VideoPublish,
} from '../../value-objects';

export class VideoEntity {
  public constructor(
    private readonly id: string,
    private title: VideoTitle,
    private videoFileIdentifier: VideoFileIdentifier,
    private publishStatus: VideoPublish,
    private visibilityStatus: VideoVisibilty,
    private readonly ownerId: VideoOwner,
    private description?: VideoDescription,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title.getValue();
  }

  public getVideoFileIdentifier(): string {
    return this.videoFileIdentifier.getValue();
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
      title: this.title.getValue(),
      description: this.description?.getValue(),
      videoUrl: this.videoFileIdentifier.getValue(),
      publishStatus: this.publishStatus.getValue(),
      visibilityStatus: this.visibilityStatus.getValue(),
      ownerId: this.ownerId.getValue(),
    };
  }

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

  public updateVideoFileIdentifier(newFileIdentifier: string): void {
    this.videoFileIdentifier = VideoFileIdentifier.create(newFileIdentifier);
  }
}
