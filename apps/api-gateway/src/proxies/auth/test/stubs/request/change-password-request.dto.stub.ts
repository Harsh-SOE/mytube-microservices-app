import { ChangePasswordRequestDto } from '../../../request';

export const ChangePasswordRequestStub = (): ChangePasswordRequestDto => {
  return {
    oldPassword: 'Test@2025',
    newPassword: 'Test@New@2025',
  };
};
