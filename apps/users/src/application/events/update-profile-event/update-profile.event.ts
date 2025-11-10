import { UserUpdateProfileDto } from '@app/contracts/users';

export class UpdateProfileEvent {
  public constructor(
    public readonly userUpdateProfileDto: {
      updatedProfile: UserUpdateProfileDto;
    },
  ) {}
}
