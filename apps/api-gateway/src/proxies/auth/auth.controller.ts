import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';

import { User } from '@gateway/utils/decorators';
import { GatewayJwtGuard } from '@gateway/infrastructure/jwt';

import {
  SignupRequestDto,
  SigninRequestDTO,
  ChangePasswordRequestDto,
} from './request';
import {
  ChangePasswordRequestResponse,
  SigninRequestResponse,
  SignupRequestResponse,
} from './response';
import { AuthService } from './auth.service';
import { AUTH_API } from './api';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_API.SIGNUP)
  signup(
    @Body() createUserDto: SignupRequestDto,
  ): Promise<SignupRequestResponse> {
    return this.authService.signup(createUserDto);
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
