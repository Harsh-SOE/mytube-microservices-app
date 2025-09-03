import { AuthSignupResponse } from '@app/contracts/auth';

export const AuthSignupResponseStub = (): AuthSignupResponse => {
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
