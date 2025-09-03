import { UserSignupResponse } from '@app/contracts/users';

export const UserSignupResponseStub = (): UserSignupResponse => {
  return {
    response: 'user signup successful',
    userId: '123abc',
  };
};
