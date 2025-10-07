import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HubMonitizationActivatedResponse } from '@app/contracts/hub';

import { HubCommandRepository } from '@hub/infrastructure/repository';

import { ActivateMonitizationCommand } from './activate-monitization.command';

@CommandHandler(ActivateMonitizationCommand)
export class ActivateMonitizationCommandHandler
  implements ICommandHandler<ActivateMonitizationCommand>
{
  public constructor(private readonly hubRespository: HubCommandRepository) {}

  async execute({
    hubActivateMonitizationDto,
  }: ActivateMonitizationCommand): Promise<HubMonitizationActivatedResponse> {
    const { id } = hubActivateMonitizationDto;
    const videoAggregate = await this.hubRespository.loadOneAggregateById(id);
    videoAggregate.updateHubMonitizedStatus(true);
    await this.hubRespository.updateOneById(id, videoAggregate);
    return { response: `Hub monitized successfully`, isMonitized: true };
  }
}
