import { SagaSignupResponse } from '@app/contracts/saga';

export const SagaSignupResponseStub = (): SagaSignupResponse => {
  return {
    response: 'user created',
    userId: '123abc',
  };
};
