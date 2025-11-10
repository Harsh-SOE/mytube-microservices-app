import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { VideoPublishedResponse } from '@app/contracts/videos';

import {
  DATABASE_COMMAND_PORT,
  VideoCommandRepositoryPort,
} from '@videos/application/ports';
import { VideoAggregate } from '@videos/domain/aggregates';
import {
  GrpcToDomainPublishEnumMapper,
  GrpcToDomainVisibilityEnumMapper,
} from '@videos/infrastructure/anti-corruption';

import { PublishVideoCommand } from './publish-video.command';

@CommandHandler(PublishVideoCommand)
export class PublishVideoHandler
  implements ICommandHandler<PublishVideoCommand>
{
  constructor(
    @Inject(DATABASE_COMMAND_PORT)
    private readonly video: VideoCommandRepositoryPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    videoCreateDto,
  }: PublishVideoCommand): Promise<VideoPublishedResponse> {
    const {
      title,
      ownerId,
      description,
      videoFileKey,
      videoPublishStatus,
      videoVisibilityStatus,
    } = videoCreateDto;
    const id = uuidv4();

    const videoDomainPublishStatus =
      GrpcToDomainPublishEnumMapper.get(videoPublishStatus);

    const videoDomainVisibilityStatus = GrpcToDomainVisibilityEnumMapper.get(
      videoVisibilityStatus,
    );

    if (!videoDomainPublishStatus || !videoDomainVisibilityStatus) {
      throw Error();
    }

    const videoAggregate = this.eventPublisher.mergeObjectContext(
      VideoAggregate.create(
        id,
        title,
        ownerId,
        videoFileKey,
        videoDomainPublishStatus,
        videoDomainVisibilityStatus,
        description ?? undefined,
      ),
    );

    await this.video.save(videoAggregate);

    videoAggregate.commit(); // publishes message to transcoder service...

    return { response: 'created', videoId: id };
  }
}
