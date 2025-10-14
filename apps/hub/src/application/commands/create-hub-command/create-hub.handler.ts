import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { HubCreatedResponse } from '@app/contracts/hub';

import { HubAggregate } from '@hub/domain/aggregates';
import {
  HUB_COMMAND_REPOSITORY,
  HubCommandRepositoryPort,
} from '@hub/application/ports';

import { CreateHubCommand } from './create-hub.command';

@CommandHandler(CreateHubCommand)
export class CreateHubCommandHandler
  implements ICommandHandler<CreateHubCommand>
{
  public constructor(
    @Inject(HUB_COMMAND_REPOSITORY)
    private readonly hubCommandRepository: HubCommandRepositoryPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    hubCreateDto: videoChannelCreateDto,
  }: CreateHubCommand): Promise<HubCreatedResponse> {
    const { userId, hubBio, isHubMonitized, hubCoverImage, isHubVerified } =
      videoChannelCreateDto;

    const id = uuidv4();

    const hubAggregate = this.eventPublisher.mergeObjectContext(
      HubAggregate.create(
        id,
        userId,
        hubBio,
        hubCoverImage,
        isHubVerified,
        isHubMonitized,
      ),
    );

    await this.hubCommandRepository.save(hubAggregate);

    hubAggregate.commit();

    return { hubId: id, response: `Channel created successfully` };
  }
}
