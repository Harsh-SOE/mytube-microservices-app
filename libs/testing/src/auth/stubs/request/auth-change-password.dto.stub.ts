import { AuthChangePasswordDto } from '@app/contracts/auth';

export const AuthChangePasswordDtoStub = (): AuthChangePasswordDto => {
  return {
    id: '123abc',
    oldPassword: 'Test@2025',
    newPassword: 'Test@New@2025',
  };
};
