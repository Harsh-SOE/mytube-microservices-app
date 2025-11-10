import { AggregateRoot } from '@nestjs/cqrs';

import { VideoCreatedEvent } from '@videos/application/events';
import {
  VideoDomainPublishStatus,
  VideoDomainVisibiltyStatus,
} from '@videos/domain/enums';
import {
  VideoDescription,
  VideoOwner,
  VideoPublish,
  VideoTitle,
  VideoFileIdentifier,
  VideoVisibilty,
} from '@videos/domain/value-objects';

import { VideoEntity } from '../../entities/video/video.entity';
import { TranscodeVideoMessage } from '@app/contracts/video-transcoder';

export class VideoAggregate extends AggregateRoot {
  public constructor(public videoEntity: VideoEntity) {
    super();
  }

  public static create(
    id: string,
    title: string,
    ownerId: string,
    videoFileIdentifier: string,
    publishStatus: VideoDomainPublishStatus,
    visibilityStatus: VideoDomainVisibiltyStatus,
    description?: string,
  ) {
    const videoEntity = new VideoEntity(
      id,
      VideoTitle.create(title),
      VideoFileIdentifier.create(videoFileIdentifier),
      VideoPublish.create(publishStatus),
      VideoVisibilty.create(visibilityStatus),
      VideoOwner.create(ownerId),
      VideoDescription.create(description),
    );

    const videoAggregate = new VideoAggregate(videoEntity);

    const transcodeVideoMessage: TranscodeVideoMessage = {
      fileIdentifier: videoAggregate.getVideo().getVideoFileIdentifier(),
      videoId: videoAggregate.getVideo().getId(),
    };

    videoAggregate.apply(new VideoCreatedEvent(transcodeVideoMessage));
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
    newIdentifier?: string;
  }) {
    if (updateProps.newTitle)
      this.videoEntity.updateTitle(updateProps.newTitle);
    if (updateProps.newDescription)
      this.videoEntity.updateDescription(updateProps.newDescription);
    if (updateProps.newPublishStatus)
      this.videoEntity.updatePublishStatus(updateProps.newPublishStatus);
    if (updateProps.newVisibilityStatus)
      this.videoEntity.updateVisibiltyStatus(updateProps.newVisibilityStatus);
    if (updateProps.newIdentifier)
      this.videoEntity.updateVideoFileIdentifier(updateProps.newIdentifier);
    return this.videoEntity;
  }
}
