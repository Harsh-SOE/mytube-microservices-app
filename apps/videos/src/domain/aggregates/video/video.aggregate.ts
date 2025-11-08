import { AggregateRoot } from '@nestjs/cqrs';

import { VideoCreatedDomainEvent } from '@videos/application/events';
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
} from '@videos/domain/value-objects';

import { VideoEntity } from '../../entities/video/video.entity';

export class VideoAggregate extends AggregateRoot {
  public constructor(public videoEntity: VideoEntity) {
    super();
  }

  public static create(
    id: string,
    title: string,
    ownerId: string,
    videoUrl: string,
    publishStatus: VideoDomainPublishStatus,
    visibilityStatus: VideoDomainVisibiltyStatus,
    description?: string,
  ) {
    const videoEntity = new VideoEntity(
      id,
      VideoTitle.create(title),
      VideoUrl.create(videoUrl),
      VideoPublish.create(publishStatus),
      VideoVisibilty.create(visibilityStatus),
      VideoOwner.create(ownerId),
      VideoDescription.create(description),
    );

    const videoAggregate = new VideoAggregate(videoEntity);
    videoAggregate.apply(
      new VideoCreatedDomainEvent({
        key: videoAggregate.getVideo().getVideoUrl(),
        videoId: videoAggregate.getVideo().getId(),
      }),
    );
    return videoAggregate;
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
