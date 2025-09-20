import { SigninRequestDTO } from '@gateway/proxies/auth/request';

export const SigninRequestStub = (): SigninRequestDTO => {
  return {
    userName: 'test-username',
    password: 'Test@2025',
  };
};
