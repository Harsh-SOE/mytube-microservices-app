import { AuthSignupDto } from '@app/contracts/auth';

export const AuthSignupDtoStub = (): AuthSignupDto => {
  return {
    userName: 'test-username',
    password: 'Test@2025',
    email: 'test@gmail.com',
    dob: '2003-03-24',
    fullName: 'test-fullname',
    avatar: 'test-avatar',
    coverImage: 'test-cover',
  };
};
