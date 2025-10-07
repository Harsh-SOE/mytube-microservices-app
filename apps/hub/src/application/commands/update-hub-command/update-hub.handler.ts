import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HubUpdateByIdResponse } from '@app/contracts/hub';

import { HubCommandRepository } from '@hub/infrastructure/repository';

import { UpdateHubCommand } from './update-hub.command';

@CommandHandler(UpdateHubCommand)
export class UpdateHubCommandHandler
  implements ICommandHandler<UpdateHubCommand>
{
  constructor(public readonly hubCommandRepository: HubCommandRepository) {}

  async execute({
    hubUpdateByIdDto,
  }: UpdateHubCommand): Promise<HubUpdateByIdResponse> {
    const { id, hubBio, hubCoverImage } = hubUpdateByIdDto;
    const hubAggregate =
      await this.hubCommandRepository.loadOneAggregateById(id);
    hubAggregate.updateHubDetails(hubBio, hubCoverImage);
    await this.hubCommandRepository.updateOneById(id, hubAggregate);
    return { response: 'hub updated successfully' };
  }
}
