import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GATEWAY_AUTH0_GAURD_STRATEGY } from '../constants';

@Injectable()
export class Auth0OAuthGaurd extends AuthGuard(GATEWAY_AUTH0_GAURD_STRATEGY) {
  constructor() {
    // pass authenticate options here — these become query params to /authorize
    super({ scope: 'openid profile email' });
  }
}
