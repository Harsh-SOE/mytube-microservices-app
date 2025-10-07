import { UpdateUserRequestDto } from '@gateway/proxies/users/request';

export const UpdateUserRequestDtoStub = (): UpdateUserRequestDto => {
  return {
    dob: '2004-03-24',
    phoneNumber: '9876543210',
  };
};
