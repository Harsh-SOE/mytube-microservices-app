import { ChangePasswordRequestResponse } from '@gateway/proxies/auth/response';

export const ChangePasswordRequestResponseStub =
  (): ChangePasswordRequestResponse => {
    return {
      response: true,
    };
  };
