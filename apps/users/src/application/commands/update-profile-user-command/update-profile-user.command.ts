import { UserUpdateDto } from '@app/contracts/users';

export class UpdateUserProfileCommand {
  constructor(public readonly updateUserDto: UserUpdateDto) {}
}
