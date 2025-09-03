import { Controller, UseFilters } from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';
import {
  AuthSignupDto,
  AuthSignupResponse,
  AuthSigninDto,
  AuthSigninResponse,
  AuthChangePasswordDto,
  AuthChangePasswordResponse,
  AuthServiceController,
  AuthServiceControllerMethods,
  AuthDeleteUserCredentialsDto,
  AuthHealthCheckRequest,
  AuthHealthCheckResponse,
} from '@app/contracts/auth';

import { AuthService } from './auth.service';
import { AuthExceptionFilter } from '../filter/auth.filter';
import { Observable } from 'rxjs';

@Controller()
@UseFilters(AuthExceptionFilter)
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}
  check(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: AuthHealthCheckRequest,
  ):
    | Promise<AuthHealthCheckResponse>
    | Observable<AuthHealthCheckResponse>
    | AuthHealthCheckResponse {
    return { status: 1 }; // 1 = SERVING
  }

  signup(authSignupUserDto: AuthSignupDto): Promise<AuthSignupResponse> {
    return this.authService.signup(authSignupUserDto);
  }

  signin(authLoginUserDto: AuthSigninDto): Promise<AuthSigninResponse> {
    return this.authService.signin(authLoginUserDto);
  }

  verifyToken(userToken: string): Promise<JwtUserPayload> {
    return this.authService.verifyToken(userToken);
  }

  changePassword(
    authChangePasswordDto: AuthChangePasswordDto,
  ): Promise<AuthChangePasswordResponse> {
    return this.authService.changePassword(authChangePasswordDto);
  }

  deleteUserCredentials(
    authDeleteUserCredentialDto: AuthDeleteUserCredentialsDto,
  ) {
    return this.authService.deleteUserCredential(authDeleteUserCredentialDto);
  }
}
