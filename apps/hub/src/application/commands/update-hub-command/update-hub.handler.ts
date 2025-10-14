import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { HubUpdateByIdResponse } from '@app/contracts/hub';

import {
  HUB_COMMAND_REPOSITORY,
  HubCommandRepositoryPort,
} from '@hub/application/ports';

import { UpdateHubCommand } from './update-hub.command';

@CommandHandler(UpdateHubCommand)
export class UpdateHubCommandHandler
  implements ICommandHandler<UpdateHubCommand>
{
  constructor(
    @Inject(HUB_COMMAND_REPOSITORY)
    private readonly hubCommandRepository: HubCommandRepositoryPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    hubUpdateByIdDto,
  }: UpdateHubCommand): Promise<HubUpdateByIdResponse> {
    const { id, hubBio, hubCoverImage } = hubUpdateByIdDto;

    const hubAggregate = this.eventPublisher.mergeObjectContext(
      await this.hubCommandRepository.loadOneAggregateById(id),
    );

    hubAggregate.updateHubDetails(hubBio, hubCoverImage);

    await this.hubCommandRepository.updateOneById(id, hubAggregate);

    hubAggregate.commit();

    return { response: 'hub updated successfully' };
  }
}
