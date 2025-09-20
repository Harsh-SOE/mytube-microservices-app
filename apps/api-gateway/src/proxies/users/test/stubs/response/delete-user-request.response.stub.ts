import { DeleteUserRequestResponse } from '@gateway/proxies/users/response';

export const DeleteUserRequestResponseStub = (): DeleteUserRequestResponse => {
  return {
    response: 'deleted',
  };
};
