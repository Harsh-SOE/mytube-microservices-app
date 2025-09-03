import { UserSignupDto } from '@app/contracts/users';

export class SignupUserCommand {
  constructor(public readonly userSignupDto: UserSignupDto) {}
}
