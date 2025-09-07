import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VideoUpdatedResponse } from '@app/contracts/videos';

import { VideoCommandRepository } from '@videos/infrastructure/repository';

import { EditVideoCommand } from './edit-video.command';
import {
  GrpcToDomainPublishEnumMapper,
  GrpcToDomainVisibilityEnumMapper,
} from '@videos/infrastructure/anti-corruption';

@CommandHandler(EditVideoCommand)
export class EditVideoHandler implements ICommandHandler<EditVideoCommand> {
  constructor(private readonly video: VideoCommandRepository) {}

  async execute({
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
    const videoAggregate = await this.video.findOneById(id);
    videoAggregate.updateVideo({
      newTitle: title,
      newDescription: description,
      newPublishStatus: domainPublishStatus,
      newVisibilityStatus: domainVisibiltyStatus,
    });
    console.log(videoAggregate);
    await this.video.updateOneById(id, videoAggregate);
    return { response: 'updated', videoId: id };
  }
}
