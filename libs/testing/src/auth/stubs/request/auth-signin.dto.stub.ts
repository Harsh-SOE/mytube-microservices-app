import { AuthSigninDto } from '@app/contracts/auth';

export const AuthSigninDtoStub = (): AuthSigninDto => {
  return {
    userName: 'test-username',
    password: 'Test@2025',
  };
};
