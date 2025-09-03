import {
  DeleteUserRequestResponseStub,
  FindUserRequestResponseStub,
  UpdatedUserRequestResponseStub,
} from '../test/stubs';

export const UsersService = jest.fn().mockReturnValue({
  updateUserDetails: jest
    .fn()
    .mockReturnValue(UpdatedUserRequestResponseStub()),

  deleteUser: jest.fn().mockReturnValue(DeleteUserRequestResponseStub()),

  getCurrentlyLoggedInUser: jest
    .fn()
    .mockReturnValue(FindUserRequestResponseStub()),

  getAllRegisteredUser: jest
    .fn()
    .mockReturnValue([FindUserRequestResponseStub()]),
});
