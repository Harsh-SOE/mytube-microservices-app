import { UserUpdateDto } from '@app/contracts/users';

export const UserUpdateDtoStub = (): UserUpdateDto => {
  return {
    id: '123abc',
    email: 'updated-test@gmail.com',
    dob: '2003-03-24',
    fullName: 'updated-fullname',
  };
};
