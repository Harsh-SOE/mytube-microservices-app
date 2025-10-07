import { Providers } from '@gateway/proxies/auth/enums';
import { LocalSignupRequestDto } from '@gateway/proxies/auth/request';

export const LocalSignupRequestStub = (): LocalSignupRequestDto => {
  return {
    provider: Providers.GOOGLE,
    userName: 'test-username',
    email: 'test@gmail.com',
    fullName: 'test-fullname',
    dob: '2003-03-24',
    avatar: 'test-avatar',
    coverImage: 'test-cover',
    password: 'test-password',
  };
};
