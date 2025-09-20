import { SignupRequestDto } from '../../../request';

export const SignupRequestStub = (): SignupRequestDto => {
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
