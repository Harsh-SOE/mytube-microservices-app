import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import {
  USER_COMMAND_REROSITORY,
  UserCommandRepositoryPort,
} from '@users/application/ports';

import { UserAggregate } from '@users/domain/aggregates';
import { UserProfileCreatedResponse } from '@app/contracts/users';

import { CreateProfileCommand } from './create-profile.command';

@CommandHandler(CreateProfileCommand)
export class CompleteSignupCommandHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    @Inject(USER_COMMAND_REROSITORY)
    private readonly userRepository: UserCommandRepositoryPort,
  ) {}

  async execute({
    userCreateProfileDto,
  }: CreateProfileCommand): Promise<UserProfileCreatedResponse> {
    // extract the required inputs...
    const { authId, email, handle } = userCreateProfileDto;

    // create a unique id for the user...
    const id = uuidv4();

    // create the aggregate using the factory
    const userAggregate = UserAggregate.create(id, authId, handle, email);

    // persist the aggregate...
    await this.userRepository.createOne(userAggregate);

    // return a response...
    return {
      response: 'User signup successful',
      userId: userAggregate.getUserSnapshot().id,
    };
  }
}
