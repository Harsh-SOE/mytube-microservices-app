import { UserLoginResponse } from '@app/contracts/users';

export const UserSigninResponseStub = (): UserLoginResponse => {
  return {
    id: '123abc',
    userName: 'test-username',
    email: 'test@gmail.com',
    dob: '2003-03-24',
    fullName: 'test-fullname',
    avatar: 'test-avatar',
    coverImage: 'test-cover',
  };
};
