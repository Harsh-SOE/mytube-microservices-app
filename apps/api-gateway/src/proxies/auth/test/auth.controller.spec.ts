/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

import {
  ChangePasswordRequestResponse,
  SigninRequestResponse,
  SignupRequestResponse,
} from '../response';

import {
  LocalSignupRequestStub,
  SigninRequestStub,
  ChangePasswordRequestStub,
  ChangePasswordRequestResponseStub,
  SigninRequestResponseStub,
  SignupRequestResponseStub,
  JwtUserPayloadStub,
} from './stubs';

// mocks the AuthService
jest.mock('../auth.service');

describe('UserController', () => {
  let authController: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  /* signup */
  describe('signup', () => {
    describe('When local signup is called', () => {
      let signupResponse: SignupRequestResponse;
      const localSignupRequestInput = LocalSignupRequestStub();
      const signupRequestExpectedResponse = SignupRequestResponseStub();
      beforeEach(async () => {
        signupResponse = await authController.signupLocal(
          localSignupRequestInput,
        );
      });

      test('then it should call auth service, with all correct paramters', () => {
        expect(authService.signupLocal).toHaveBeenCalledWith(
          localSignupRequestInput,
        );
      });

      test('then it should return the UserSignup response', () => {
        expect(signupResponse).toEqual(signupRequestExpectedResponse);
      });
    });
  });

  /* signin */
  describe('signin', () => {
    describe('when signin is called', () => {
      let signinResponse: SigninRequestResponse;
      const signinRequestInput = SigninRequestStub();
      const signinRequestExpectedResponse = SigninRequestResponseStub();

      beforeEach(async () => {
        signinResponse = await authController.signin(signinRequestInput);
      });

      test('then it should call auth service', () => {
        expect(authService.signin).toHaveBeenCalledWith(signinRequestInput);
      });

      test('then it should return the LoginResponse', () => {
        expect(signinResponse).toEqual(signinRequestExpectedResponse);
      });
    });
  });

  /* changePassword */
  describe('changePassword', () => {
    describe('When change password is called', () => {
      let changePasswordResponse: ChangePasswordRequestResponse;
      const changePasswordRequestStub = ChangePasswordRequestStub();
      const changePasswordExpectedResponse =
        ChangePasswordRequestResponseStub();
      const jwtUserPayloadStub = JwtUserPayloadStub();

      beforeEach(async () => {
        changePasswordResponse = await authController.changePassword(
          changePasswordRequestStub,
          jwtUserPayloadStub,
        );
      });

      test('then it should call the auth service with proper paramters', () => {
        expect(authService.changePassword).toHaveBeenCalledWith(
          jwtUserPayloadStub.id,
          changePasswordRequestStub,
        );
      });

      test('then it should return a response of type ChangePassswordResponse', () => {
        expect(changePasswordResponse).toEqual(changePasswordExpectedResponse);
      });
    });
  });
});
