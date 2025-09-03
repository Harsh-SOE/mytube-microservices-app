/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import {
  FindUserRequestResponse,
  UpdatedUserRequestResponse,
} from '../response';
import {
  FindUserRequestResponseStub,
  UpdateUserRequestDtoStub,
  UpdatedUserRequestResponseStub,
} from './stubs';
import { JwtUserPayloadStub } from '../../auth/test/stubs';

jest.mock('../users.service');

describe('UserController', () => {
  let usersService: UsersService;
  let usersController: UsersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);

    jest.clearAllMocks();
  });

  describe('UpdateUserDetails', () => {
    describe('when update user is called', () => {
      let userUpdatedResponse: UpdatedUserRequestResponse;

      const userUpdatedRequestStub = UpdateUserRequestDtoStub();
      const userUpdatedRequestResponseStub = UpdatedUserRequestResponseStub();

      beforeEach(async () => {
        userUpdatedResponse = await usersController.updateUserDetails(
          userUpdatedRequestStub,
          JwtUserPayloadStub(),
        );
      });

      test('then it should call usersService with proper inputs', () => {
        expect(usersService.updateUserDetails).toHaveBeenCalledWith(
          JwtUserPayloadStub().id,
          userUpdatedRequestStub,
        );
      });

      test('then it should return the user updated response', () => {
        expect(userUpdatedResponse).toEqual(userUpdatedRequestResponseStub);
      });
    });
  });

  describe('GetCurrentlySignedInUser', () => {
    describe('when GetCurrentlySignedInUser is called', () => {
      let getLoggedInUserResponse: FindUserRequestResponse;

      const findUserRequestExpectedResponse = FindUserRequestResponseStub();
      const jwtUserPayloadStub = JwtUserPayloadStub();

      beforeEach(async () => {
        getLoggedInUserResponse =
          await usersController.GetCurrentlySignedInUser(jwtUserPayloadStub);
      });

      test('then it should call the usersService with proper inputs', () => {
        expect(usersService.getCurrentlyLoggedInUser).toHaveBeenCalledWith(
          jwtUserPayloadStub.id,
        );
      });

      test('then it should return the logged in user response', () => {
        expect(getLoggedInUserResponse).toEqual(
          findUserRequestExpectedResponse,
        );
      });
    });
  });

  describe('getAllRegisteredUser', () => {
    describe('when it getAllRegisteredUser is called', () => {
      let findAllUserRequestResponse: FindUserRequestResponse[];

      const findAllUserRequestExpectedResponseStub = [
        FindUserRequestResponseStub(),
      ];

      beforeEach(async () => {
        findAllUserRequestResponse =
          await usersController.getAllRegisteredUser();
      });

      test('then it should call the usersService with proper inputs', () => {
        expect(usersService.getAllRegisteredUser).toHaveBeenCalledTimes(1);
      });

      test('it should return all users registered', () => {
        expect(findAllUserRequestResponse).toEqual(
          findAllUserRequestExpectedResponseStub,
        );
      });
    });
  });
});
