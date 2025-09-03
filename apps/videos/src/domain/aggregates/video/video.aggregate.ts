import { AggregateRoot } from '@nestjs/cqrs';
import { VideoEntity } from '../../entities/video/video.entity';

export class VideoAggregate extends AggregateRoot {
  public constructor(public videoEntity: VideoEntity) {
    super();
  }

  public getSnapshot() {
    return this.videoEntity.getSnapShot();
  }

  public getVideo() {
    return this.videoEntity;
  }

  public updateVideo(updateProps: {
    newTitle?: string;
    newDescription?: string;
    newPublishStatus?: string;
    newVisibilityStatus?: string;
  }) {
    if (updateProps.newTitle)
      this.videoEntity.updateTitle(updateProps.newTitle);
    if (updateProps.newDescription)
      this.videoEntity.updateDescription(updateProps.newDescription);
    if (updateProps.newPublishStatus)
      this.videoEntity.updatePublishStatus(updateProps.newPublishStatus);
    if (updateProps.newVisibilityStatus)
      this.videoEntity.updateVisibiltyStatus(updateProps.newVisibilityStatus);
    return this.videoEntity;
  }
}
