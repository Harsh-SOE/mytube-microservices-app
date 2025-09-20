import { UpdatedUserRequestResponse } from '@gateway/proxies/users/response';

export const UpdatedUserRequestResponseStub =
  (): UpdatedUserRequestResponse => {
    return {
      response: 'user updated',
    };
  };
