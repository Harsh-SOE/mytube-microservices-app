import { UserAuthPayload } from '@app/contracts/auth';

export const JwtUserPayloadStub = (): UserAuthPayload => {
  return {
    id: '123abc',
    authId: 'auth-id',
    email: 'test@gmail.com',
    handle: 'test-handle',
  };
};
