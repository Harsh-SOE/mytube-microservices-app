import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileCommand } from './update-profile.command';
import { UserCommandRepository } from '@users/infrastructure/repository';
import { UserProfileUpdatedResponse } from '@app/contracts/users';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(private readonly userRepository: UserCommandRepository) {}

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
