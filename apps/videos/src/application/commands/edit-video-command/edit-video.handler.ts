import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VideoUpdatedResponse } from '@app/contracts/videos';

import {
  DATABASE_COMMAND_PORT,
  DATABASE_QUERY_PORT,
  VideoCommandRepositoryPort,
  VideoQueryRepositoryPort,
} from '@videos/application/ports';
import {
  GrpcToDomainPublishEnumMapper,
  GrpcToDomainVisibilityEnumMapper,
} from '@videos/infrastructure/anti-corruption';

import { EditVideoCommand } from './edit-video.command';

@CommandHandler(EditVideoCommand)
export class EditVideoHandler implements ICommandHandler<EditVideoCommand> {
  public constructor(
    @Inject(DATABASE_COMMAND_PORT)
    private readonly videoCommandAdapter: VideoCommandRepositoryPort,
    @Inject(DATABASE_QUERY_PORT)
    private readonly videoQueryAdapter: VideoQueryRepositoryPort,
  ) {}

  public async execute({
    updateVideoDto,
  }: EditVideoCommand): Promise<VideoUpdatedResponse> {
    const {
      id,
      title,
      description,
      videoPublishStatus,
      videoVisibilityStatus,
    } = updateVideoDto;

    const domainPublishStatus = videoPublishStatus
      ? GrpcToDomainPublishEnumMapper.get(videoPublishStatus)
      : undefined;
    const domainVisibiltyStatus = videoVisibilityStatus
      ? GrpcToDomainVisibilityEnumMapper.get(videoVisibilityStatus)
      : undefined;

    const videoAggregate = await this.videoCommandAdapter.findOneById(id);

    videoAggregate.updateVideo({
      newTitle: title,
      newDescription: description,
      newPublishStatus: domainPublishStatus,
      newVisibilityStatus: domainVisibiltyStatus,
    });

    await this.videoCommandAdapter.updateOneById(id, videoAggregate);

    return { response: 'updated', videoId: id };
  }
}
