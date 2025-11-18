import { Response } from 'express';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { User } from '@gateway/proxies/auth/decorators';
import { Auth0ProfileUser } from '@gateway/proxies/auth/types';
import { Auth0OAuthGaurd } from '@gateway/proxies/auth/guards';

import { AuthService } from './auth.service';
import { AUTH_API } from './api';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(Auth0OAuthGaurd)
  @Get(AUTH_API.AUTHENTICATE)
  authenticate() {}

  @UseGuards(Auth0OAuthGaurd)
  @Get(AUTH_API.AUTH0_REDIRECT)
  onAuthRedirect(
    @User() auth0User: Auth0ProfileUser,
    @Res() response: Response,
  ): Promise<void> {
    return this.authService.onAuthRedirect(auth0User, response);
  }
}
