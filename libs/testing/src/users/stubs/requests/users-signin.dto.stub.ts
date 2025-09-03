import { UserLoginDto } from '@app/contracts/users';

export const UserSigninDtoStub = (): UserLoginDto => {
  return {
    userName: 'test-username',
  };
};
