import { FindUserByIdRequestDto } from '@gateway/proxies/users/request';

export const FindUserByIdRequestDtoStub = (): FindUserByIdRequestDto => {
  return {
    id: '123abc',
  };
};
