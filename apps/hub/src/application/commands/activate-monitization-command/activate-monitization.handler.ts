import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { HubMonitizationActivatedResponse } from '@app/contracts/hub';

import {
  HUB_COMMAND_REPOSITORY,
  HubCommandRepositoryPort,
} from '@hub/application/ports';

import { ActivateMonitizationCommand } from './activate-monitization.command';

@CommandHandler(ActivateMonitizationCommand)
export class ActivateMonitizationCommandHandler
  implements ICommandHandler<ActivateMonitizationCommand>
{
  public constructor(
    @Inject(HUB_COMMAND_REPOSITORY)
    private readonly hubRespository: HubCommandRepositoryPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    hubActivateMonitizationDto,
  }: ActivateMonitizationCommand): Promise<HubMonitizationActivatedResponse> {
    const { id } = hubActivateMonitizationDto;

    const hubAggregate = this.eventPublisher.mergeObjectContext(
      await this.hubRespository.loadOneAggregateById(id),
    );

    hubAggregate.updateHubMonitizedStatus(true);

    await this.hubRespository.updateOneById(id, hubAggregate);

    hubAggregate.commit();

    return { response: `Hub monitized successfully`, isMonitized: true };
  }
}
