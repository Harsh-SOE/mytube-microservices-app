import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { HubVerifyByIdResponse } from '@app/contracts/hub';

import {
  HUB_COMMAND_REPOSITORY,
  HubCommandRepositoryPort,
} from '@hub/application/ports';

import { VerifyHubCommand } from './verify-hub.command';

@CommandHandler(VerifyHubCommand)
export class VerifyHubEventHandler
  implements ICommandHandler<VerifyHubCommand>
{
  public constructor(
    @Inject(HUB_COMMAND_REPOSITORY)
    private readonly hubRepository: HubCommandRepositoryPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    verifyHubDto,
  }: VerifyHubCommand): Promise<HubVerifyByIdResponse> {
    const { id } = verifyHubDto;

    const hubAggregate = this.eventPublisher.mergeObjectContext(
      await this.hubRepository.loadOneAggregateById(id),
    );

    hubAggregate.updateHubVerificationStatus();

    await this.hubRepository.updateOneById(id, hubAggregate);

    hubAggregate.commit();

    return { response: 'hub was verified' };
  }
}
