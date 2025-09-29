import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

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
  AuthDeleteUserCredentialsResponse,
} from '@app/contracts/auth';
import { GrpcAppExceptionFilter } from '@app/utils';

import { AuthService } from './auth.service';

@Controller()
@UseFilters(GrpcAppExceptionFilter)
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign up a new user using the provided AuthSignupDto.
   *
   * This function calls the AuthService.signup function with the provided AuthSignupDto.
   * It returns a Promise, Observable or AuthSignupResponse.
   *
   * @param {AuthSignupDto} authSignupUserDto - The user signup dto.
   * @returns {Promise<AuthSignupResponse>|Observable<AuthSignupResponse>|AuthSignupResponse} - The signup response.
   */
  signup(
    authSignupUserDto: AuthSignupDto,
  ):
    | Promise<AuthSignupResponse>
    | Observable<AuthSignupResponse>
    | AuthSignupResponse {
    return this.authService.signup(authSignupUserDto);
  }

  /**
   * Sign in an existing user using the provided AuthSigninDto.
   *
   * This function calls the AuthService.signin function with the provided AuthSigninDto.
   * It returns a Promise, Observable or AuthSigninResponse.
   *
   * @param {AuthSigninDto} authSigninUserDto - The user signin dto.
   * @returns {Promise<AuthSigninResponse>|Observable<AuthSigninResponse>|AuthSigninResponse} - The signin response.
   */
  signin(
    authSigninUserDto: AuthSigninDto,
  ):
    | Promise<AuthSigninResponse>
    | Observable<AuthSigninResponse>
    | AuthSigninResponse {
    return this.authService.signin(authSigninUserDto);
  }

  /**
   * Verify a user token.
   *
   * This function calls the AuthService.verifyToken function with the provided user token.
   * It returns a Promise, Observable or JwtUserPayload.
   *
   * @param {string} userToken - The user token to verify.
   * @returns {Promise<JwtUserPayload>|Observable<JwtUserPayload>|JwtUserPayload} - The verified user payload.
   */
  verifyToken(userToken: string): Promise<JwtUserPayload> {
    return this.authService.verifyToken(userToken);
  }

  /**
   * Change the password for a user using the provided AuthChangePasswordDto.
   * This function calls the AuthService.changePassword function with the provided AuthChangePasswordDto.
   * It returns a Promise, Observable or AuthChangePasswordResponse.
   * @param {AuthChangePasswordDto} authChangePasswordDto - The user change password dto.
   * @returns {Promise<AuthChangePasswordResponse>|Observable<AuthChangePasswordResponse>|AuthChangePasswordResponse} - The change password response.
   */
  changePassword(
    authChangePasswordDto: AuthChangePasswordDto,
  ):
    | Promise<AuthChangePasswordResponse>
    | Observable<AuthChangePasswordResponse>
    | AuthChangePasswordResponse {
    return this.authService.changePassword(authChangePasswordDto);
  }

  /**
   * Delete a user credential using the provided AuthDeleteUserCredentialsDto.
   *
   * This function calls the AuthService.deleteUserCredential function with the provided AuthDeleteUserCredentialsDto.
   * It returns a Promise, Observable or AuthDeleteUserCredentialsResponse.
   *
   * @param {AuthDeleteUserCredentialsDto} authDeleteUserCredentialDto - The user delete user credential dto.
   * @returns {Promise<AuthDeleteUserCredentialsResponse>|Observable<AuthDeleteUserCredentialsResponse>|AuthDeleteUserCredentialsResponse} - The delete user credential response.
   */
  deleteUserCredentials(
    authDeleteUserCredentialDto: AuthDeleteUserCredentialsDto,
  ):
    | Promise<AuthDeleteUserCredentialsResponse>
    | Observable<AuthDeleteUserCredentialsResponse>
    | AuthDeleteUserCredentialsResponse {
    return this.authService.deleteUserCredential(authDeleteUserCredentialDto);
  }
}
