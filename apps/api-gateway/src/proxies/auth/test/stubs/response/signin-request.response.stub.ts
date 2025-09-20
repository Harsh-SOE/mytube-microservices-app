import { SigninRequestResponse } from '@gateway/proxies/auth/response';

export const SigninRequestResponseStub = (): SigninRequestResponse => {
  return {
    token: 'test-token',
  };
};
