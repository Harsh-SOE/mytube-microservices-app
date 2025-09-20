import { DeleteUserRequestDto } from '@gateway/proxies/users/request';

export const DeleteUserRequestDtoStub = (): DeleteUserRequestDto => {
  return {
    id: '123abc',
  };
};
