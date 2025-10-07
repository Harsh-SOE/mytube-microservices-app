import { FindUserRequestResponse } from '@gateway/proxies/users/response';

export const FindUserRequestResponseStub = (): FindUserRequestResponse => {
  return {
    id: '123abc',
    dob: '2003-03-24',
    email: 'test@gmail.com',
    fullName: 'test-fullname',
    handle: 'test-handle',
    phoneNumber: '9876543210',
    isPhoneNumberVerified: false,
    languagePreference: 'en',
    notification: true,
    onBoardingComplete: false,
    region: 'IN',
    themePreference: 'SYSTEM',
  };
};
