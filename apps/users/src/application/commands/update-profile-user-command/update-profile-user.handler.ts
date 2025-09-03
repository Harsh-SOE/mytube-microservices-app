import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { userUpdateProfileResponse } from '@app/contracts/users';

import { UserCommandRepository } from '@users/infrastructure/repository';

import { UpdateUserProfileCommand } from './update-profile-user.command';

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler
  implements ICommandHandler<UpdateUserProfileCommand>
{
  constructor(
    private user: UserCommandRepository,
    private eventPublisher: EventPublisher,
  ) {}

  async execute({
    updateUserDto,
  }: UpdateUserProfileCommand): Promise<userUpdateProfileResponse> {
    const { id, email, dob, fullName } = updateUserDto;
    const foundUserAggregate = this.eventPublisher.mergeObjectContext(
      await this.user.findOneById(id),
    );

    foundUserAggregate.updateUserProfile(
      fullName,
      email,
      dob ? new Date(dob) : undefined,
    );

    await this.user.updateOneById(id, foundUserAggregate);
    foundUserAggregate.commit();
    return { response: 'user profile updated successfully', userId: id };
  }
}
