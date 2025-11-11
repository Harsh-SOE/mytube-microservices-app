import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GATEWAY_AUTH0_GAURD_STRATEGY } from '../types';

@Injectable()
export class Auth0OAuthGaurd extends AuthGuard(GATEWAY_AUTH0_GAURD_STRATEGY) {
  constructor() {
    super({ scope: 'openid profile email' });
  }
}
