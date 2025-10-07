import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';

import { User } from '@gateway/utils/decorators';
import {
  Auth0OAuthGaurd,
  GatewayJwtGuard,
} from '@gateway/infrastructure/passport';
import { Auth0ProfileUser } from '@gateway/infrastructure/passport/payloads';

import { ChangePasswordRequestDto } from './request';
import { ChangePasswordRequestResponse } from './response';
import { AuthService } from './auth.service';
import { AUTH_API } from './api';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(Auth0OAuthGaurd)
  @Get(AUTH_API.SIGNUP_AUTH)
  signup() {}

  @UseGuards(Auth0OAuthGaurd)
  @Get(AUTH_API.AUTH0_REDIRECT)
  signupRedirect(@User() auth0UserPayload: Auth0ProfileUser): Auth0ProfileUser {
    // TODO: Complete saving the user in the user service's database

    console.log(auth0UserPayload);
    return auth0UserPayload;
  }

  @UseGuards(GatewayJwtGuard)
  @Patch(AUTH_API.CHANGE_PASSWORD)
  changePassword(
    @Body() changePasswordDto: ChangePasswordRequestDto,
    @User() loggedInUser: JwtUserPayload,
  ): Promise<ChangePasswordRequestResponse> {
    return this.authService.changePassword(loggedInUser.id, changePasswordDto);
  }
}
