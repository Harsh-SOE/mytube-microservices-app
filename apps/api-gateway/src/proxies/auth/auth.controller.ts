import { Body, Controller, Get, UseGuards } from '@nestjs/common';

import { Auth0OAuthGaurd } from '@gateway/infrastructure/auth';

import { AuthService } from './auth.service';
import { AUTH_API } from './api';
import { User } from '@gateway/utils/decorators';
import { Auth0ProfileUser } from '@gateway/infrastructure/auth/payloads';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(Auth0OAuthGaurd)
  @Get(AUTH_API.AUTHENTICATE)
  signup() {}

  @Get(AUTH_API.AUTH0_REDIRECT)
  onAuthRedirect(@User() auth0User: Auth0ProfileUser): Promise<{
    response: string;
    token: string | undefined;
    userAuthCred: Auth0ProfileUser;
  }> {
    return this.authService.onAuthRedirect(auth0User);
  }
}
