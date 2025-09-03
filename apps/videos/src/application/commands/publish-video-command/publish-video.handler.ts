import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { VideoPublishedResponse } from '@app/contracts/videos';

import { VideoAggregateFactory } from '@videos/domain/factories';
import { VideoCommandRepository } from '@videos/infrastructure/repository';

import { PublishVideoCommand } from './publish-video.command';

@CommandHandler(PublishVideoCommand)
export class PublishVideoHandler
  implements ICommandHandler<PublishVideoCommand>
{
  constructor(
    private readonly videoAggregateFactory: VideoAggregateFactory,
    private readonly video: VideoCommandRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    videoCreateDto,
  }: PublishVideoCommand): Promise<VideoPublishedResponse> {
    const {
      title,
      ownerId,
      description,
      videoVisibiltyStatus,
      videoFileUrl,
      videoPublishStatus,
    } = videoCreateDto;
    const id = uuidv4();
    const videoAggregate = this.eventPublisher.mergeObjectContext(
      this.videoAggregateFactory.create(
        id,
        title,
        ownerId,
        videoFileUrl,
        videoPublishStatus,
        videoVisibiltyStatus,
        description ?? undefined,
      ),
    );
    console.log(
      `Video created by key: ${videoAggregate.getVideo().getVideoUrl()}`,
    );
    await this.video.createOne(videoAggregate);
    videoAggregate.commit();
    return { response: 'created', videoId: id };
  }
}
