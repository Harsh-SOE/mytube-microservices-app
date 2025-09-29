import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';

import { User } from '@gateway/utils/decorators';
import {
  GatewayGoogleOAuthGaurd,
  GatewayJwtGuard,
} from '@gateway/infrastructure/auth';

import {
  GoogleSignupRequestDto,
  SigninRequestDTO,
  ChangePasswordRequestDto,
  LocalSignupRequestDto,
} from './request';
import {
  ChangePasswordRequestResponse,
  SigninRequestResponse,
  SignupRequestResponse,
} from './response';
import { AuthService } from './auth.service';
import { AUTH_API } from './api';
import { GoogleProfileUser } from '@gateway/infrastructure/auth/payloads';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_API.SIGNUP_LOCAL)
  signupLocal(
    @User() localSignupRequestDto: LocalSignupRequestDto,
  ): Promise<SignupRequestResponse> {
    return this.authService.signupLocal(localSignupRequestDto);
  }

  @UseGuards(GatewayGoogleOAuthGaurd)
  @Post(AUTH_API.SIGNUP_GOOGLE)
  signupGoogle() {}

  @Get('google/callback')
  @UseGuards(GatewayGoogleOAuthGaurd)
  googleAuthRedirect(
    @User() googleUserPayload: GoogleProfileUser,
  ): GoogleProfileUser {
    return googleUserPayload;
  }

  @Post('google/signup')
  googleSignup(@Body() googleSignupRequestDto: GoogleSignupRequestDto) {
    return this.authService.signupGoogle(googleSignupRequestDto);
  }

  @Post(AUTH_API.SIGNIN)
  signin(
    @Body() loginUserDto: SigninRequestDTO,
  ): Promise<SigninRequestResponse> {
    return this.authService.signin(loginUserDto);
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
