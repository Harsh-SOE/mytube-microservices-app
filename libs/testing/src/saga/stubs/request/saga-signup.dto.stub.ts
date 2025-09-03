import { SagaSignupDto } from '@app/contracts/saga';

export const SagaSignupDtoStub = (): SagaSignupDto => {
  return {
    userName: 'test-username',
    email: 'test@gmail.com',
    fullName: 'test-fullname',
    dob: '2003-03-24',
    password: 'Test@2025',
    avatar: 'test-avatar',
    coverImage: 'test-cover',
  };
};
