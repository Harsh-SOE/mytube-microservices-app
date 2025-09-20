import { FindUserRequestResponse } from '@gateway/proxies/users/response';

export const FindUserRequestResponseStub = (): FindUserRequestResponse => {
  return {
    id: '123abc',
    dob: '2003-03-24',
    email: 'test@gmail.com',
    fullName: 'test-fullname',
    userName: 'test-fullname',
  };
};
