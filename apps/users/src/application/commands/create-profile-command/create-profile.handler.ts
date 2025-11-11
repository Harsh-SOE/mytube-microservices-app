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
    const { authId, email, handle } = userCreateProfileDto;

    const id = uuidv4();

    const userAggregate = UserAggregate.create(id, authId, handle, email);

    await this.userRepository.save(userAggregate);

    return {
      response: 'User signup successful',
      userId: userAggregate.getUserSnapshot().id,
    };
  }
}
