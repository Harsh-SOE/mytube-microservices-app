import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { HubCreatedResponse } from '@app/contracts/hub';

import { HubCommandRepository } from '@hub/infrastructure/repository';
import { HubAggregateFactory } from '@hub/domain/factories';

import { CreateHubCommand } from './create-hub.command';

@CommandHandler(CreateHubCommand)
export class CreateHubCommandHandler
  implements ICommandHandler<CreateHubCommand>
{
  public constructor(
    public readonly hubCommandRepository: HubCommandRepository,
    public readonly hubAggregateFactory: HubAggregateFactory,
  ) {}

  async execute({
    hubCreateDto: videoChannelCreateDto,
  }: CreateHubCommand): Promise<HubCreatedResponse> {
    const { userId, hubBio, isHubMonitized, hubCoverImage, isHubVerified } =
      videoChannelCreateDto;

    const id = uuidv4();

    const hubAggregate = this.hubAggregateFactory.create(
      id,
      userId,
      hubBio,
      hubCoverImage,
      isHubVerified,
      isHubMonitized,
    );

    await this.hubCommandRepository.createOne(hubAggregate);
    return { hubId: id, response: `Channel created successfully` };
  }
}
