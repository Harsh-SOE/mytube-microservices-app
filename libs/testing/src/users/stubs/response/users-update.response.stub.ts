import { userUpdateProfileResponse } from '@app/contracts/users';

export const UserUpdateResponseStub = (): userUpdateProfileResponse => {
  return {
    response: 'user updated successfully',
    userId: '123abc',
  };
};
