import {
  ChangePasswordRequestResponseStub,
  SigninRequestResponseStub,
  SignupRequestResponseStub,
} from '../test/stubs';

export const AuthService = jest.fn().mockReturnValue({
  signup: jest.fn().mockResolvedValue(SignupRequestResponseStub()),
  signin: jest.fn().mockResolvedValue(SigninRequestResponseStub()),
  changePassword: jest
    .fn()
    .mockResolvedValue(ChangePasswordRequestResponseStub()),
});
