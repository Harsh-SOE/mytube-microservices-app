import { UserLoginDto } from '@app/contracts/users';

export class LoginSearchQuery {
  constructor(public readonly userloginDto: UserLoginDto) {}
}
