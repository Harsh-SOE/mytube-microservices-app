import { AuthSignupDto, ProviderTransport } from '@app/contracts/auth';

export const AuthSignupDtoStub = (): AuthSignupDto => {
  return {
    provider: ProviderTransport.TRANSPORT_GOOGLE,
    providerId: '0123',
    userName: 'test-username',
    email: 'test@gmail.com',
    fullName: 'test-fullname',
    dob: '2003-03-24',
    password: 'Test@2025',
    avatar: 'test-avatar',
    coverImage: 'test-cover',
    accessToken: 'adcak',
  };
};
