import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HubVerifyByIdResponse } from '@app/contracts/hub';

import { HubCommandRepository } from '@hub/infrastructure/repository';

import { VerifyHubCommand } from './verify-hub.command';

@CommandHandler(VerifyHubCommand)
export class VerifyHubEventHandler
  implements ICommandHandler<VerifyHubCommand>
{
  public constructor(public readonly hubRepository: HubCommandRepository) {}

  async execute({
    verifyHubDto,
  }: VerifyHubCommand): Promise<HubVerifyByIdResponse> {
    const { id } = verifyHubDto;
    const hubAggregate = await this.hubRepository.loadOneAggregateById(id);
    hubAggregate.updateHubVerificationStatus();
    await this.hubRepository.updateOneById(id, hubAggregate);
    return { response: 'hub was verified' };
  }
}
