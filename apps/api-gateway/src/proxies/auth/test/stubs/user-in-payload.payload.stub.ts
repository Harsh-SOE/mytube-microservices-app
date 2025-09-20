import { JwtUserPayload } from '@app/contracts/jwt';

export const JwtUserPayloadStub = (): JwtUserPayload => {
  return {
    id: '123abc',
    userName: 'test-username',
    fullName: 'test-fullname',
    email: 'test@gmail.com',
    dob: '2003-03-24',
  };
};
