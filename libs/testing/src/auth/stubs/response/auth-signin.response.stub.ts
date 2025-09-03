import { AuthSigninResponse } from '@app/contracts/auth';

export const AuthSigninResponseStub = (): AuthSigninResponse => {
  return {
    token: 'test-token',
  };
};
