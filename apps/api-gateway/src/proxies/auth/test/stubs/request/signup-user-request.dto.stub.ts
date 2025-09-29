import { GoogleSignupRequestDto } from '@gateway/proxies/auth/request';

export const SignupRequestStub = (): GoogleSignupRequestDto => {
  return {
    userName: 'test-username',
    fullName: 'test-fullname',
    password: 'Test@2025',
    avatar: 'test-avatar',
    coverImage: 'test-cover',
    dob: '2003-03-24',
    email: 'test@gmail.com',
  };
};
