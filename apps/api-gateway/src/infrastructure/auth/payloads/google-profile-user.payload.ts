import { Providers } from '@gateway/proxies/auth/enums';

export interface GoogleProfileUser {
  provider: Providers;
  providerId: string;
  email?: string;
  isEmailVerified?: boolean;
  fullName?: string;
  avatar?: string;
  googleAccessToken: string;
  googleRefreshToken: string;
  issuedAt: number;
  expiry: number;
}
