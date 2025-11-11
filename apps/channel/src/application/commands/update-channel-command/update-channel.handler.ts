import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { ChannelUpdateByIdResponse } from '@app/contracts/channel';

import {
  CHANNEL_COMMAND_REPOSITORY,
  ChannelCommandRepositoryPort,
} from '@channel/application/ports';

import { UpdateChannelCommand } from './update-channel.command';

@CommandHandler(UpdateChannelCommand)
export class UpdateChannelCommandHandler
  implements ICommandHandler<UpdateChannelCommand>
{
  constructor(
    @Inject(CHANNEL_COMMAND_REPOSITORY)
    private readonly channelCommandRepository: ChannelCommandRepositoryPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    channelUpdateByIdDto,
  }: UpdateChannelCommand): Promise<ChannelUpdateByIdResponse> {
    const { id, channelBio, channelCoverImage } = channelUpdateByIdDto;
    const channelAggregate =
      await this.channelCommandRepository.findOneById(id);

    if (!channelAggregate) {
      throw new Error();
    }

    const channelAggregateWithEvents =
      this.eventPublisher.mergeObjectContext(channelAggregate);

    channelAggregateWithEvents.updateChannelDetails(
      channelBio,
      channelCoverImage,
    );

    await this.channelCommandRepository.updateOneById(
      id,
      channelAggregateWithEvents,
    );

    channelAggregateWithEvents.commit();

    return { response: 'channel updated successfully' };
  }
}
