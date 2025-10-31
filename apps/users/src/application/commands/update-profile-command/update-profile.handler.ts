import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserProfileUpdatedResponse } from '@app/contracts/users';

import {
  USER_COMMAND_REROSITORY,
  UserCommandRepositoryPort,
} from '@users/application/ports/repository';

import { UpdateProfileCommand } from './update-profile.command';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(
    @Inject(USER_COMMAND_REROSITORY)
    private readonly userRepository: UserCommandRepositoryPort,
  ) {}

  async execute({
    userUpdateProfileDto,
  }: UpdateProfileCommand): Promise<UserProfileUpdatedResponse> {
    // extract the inputs...
    const { id, dob, phoneNumber } = userUpdateProfileDto;

    // load the required aggregate...
    const userAggregate = await this.userRepository.loadOneAggregateById(id);

    const birthday = dob ? new Date(dob) : undefined;

    // enforce the profile updattion business rules here...
    userAggregate.updateUserProfile(birthday, phoneNumber);

    // perist the updated aggregate...
    await this.userRepository.updateOneById(id, userAggregate);

    // return a response...
    return {
      response: 'User profile updated successfully',
      userId: userAggregate.getUserSnapshot().id,
    };
  }
}
