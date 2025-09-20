import { UpdateUserRequestDto } from '@gateway/proxies/users/request';

export const UpdateUserRequestDtoStub = (): UpdateUserRequestDto => {
  return {
    fullName: 'updated-test-username',
    email: 'updated-test@email.com',
  };
};
