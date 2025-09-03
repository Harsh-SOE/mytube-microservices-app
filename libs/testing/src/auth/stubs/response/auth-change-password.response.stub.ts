import { AuthChangePasswordResponse } from '@app/contracts/auth';

export const AuthChangePasswordResponseStub =
  (): AuthChangePasswordResponse => {
    return {
      response: true,
    };
  };
