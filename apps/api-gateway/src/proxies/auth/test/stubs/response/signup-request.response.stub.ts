import { SignupRequestResponse } from '@gateway/proxies/auth/response';

export const SignupRequestResponseStub = (): SignupRequestResponse => {
  return {
    response: `Signup successful`,
    userId: `0123456789`,
  };
};
