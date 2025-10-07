import { UserUpdateProfileResponse } from '@app/contracts/users';

export const UserUpdateResponseStub = (): UserUpdateProfileResponse => {
  return {
    response: 'user updated successfully',
    userId: '123abc',
  };
};
