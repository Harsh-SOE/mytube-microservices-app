import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { UserCommandRepository } from '@users/infrastructure/repository';
import { UserAggregateFactory } from '@users/domain/factories';

import { UserProfileCreatedResponse } from '@app/contracts/users';

import { CreateProfileCommand } from './create-profile.command';

@CommandHandler(CreateProfileCommand)
export class CompleteSignupCommandHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    private readonly userAggregateFactory: UserAggregateFactory,
    private readonly userRepository: UserCommandRepository,
  ) {}

  async execute({
    userCreateProfileDto,
  }: CreateProfileCommand): Promise<UserProfileCreatedResponse> {
    // extract the required inputs...
    const { authId, email, handle } = userCreateProfileDto;

    // create a unique id for the user...
    const id = uuidv4();

    // create the aggregate using the factory
    const userAggregate = this.userAggregateFactory.create(
      id,
      authId,
      handle,
      email,
    );

    // persist the aggregate...
    await this.userRepository.createOne(userAggregate);

    // return a response...
    return {
      response: 'User signup successful',
      userId: userAggregate.getUserSnapshot().id,
    };
  }
}
