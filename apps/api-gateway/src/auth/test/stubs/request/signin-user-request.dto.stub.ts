import { SigninRequestDTO } from '../../../request';

export const SigninRequestStub = (): SigninRequestDTO => {
  return {
    userName: 'test-username',
    password: 'Test@2025',
  };
};
