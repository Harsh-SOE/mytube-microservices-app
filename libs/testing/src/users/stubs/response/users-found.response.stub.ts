import { UserFoundResponse } from '@app/contracts/users';

export const UserFoundResponseStub = (): UserFoundResponse => {
  return {
    id: '123abc',
    authUserId: 'test_id',
    handle: 'test-handle',
    email: 'test@gmail.com',
    dob: '2003-03-24',
    phoneNumber: '9876543210',
    isPhoneNumberVerified: false,
    languagePreference: 'en',
    notification: true,
    themePreference: 'SYSTEM',
    onBoardingComplete: false,
    region: 'IN',
  };
};
