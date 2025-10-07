import { UserUpdateProfileDto } from '@app/contracts/users';

export const UserUpdateDtoStub = (): UserUpdateProfileDto => {
  return {
    id: '123abc',
    dob: '2003-02-24',
    phoneNumber: '0123456789',
  };
};
