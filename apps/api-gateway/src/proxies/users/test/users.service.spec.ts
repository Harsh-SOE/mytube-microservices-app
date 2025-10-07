/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getToken } from '@willsoto/nestjs-prometheus';

import { USER_SERVICE_NAME, UserServiceClient } from '@app/contracts/users';
import {
  userClientMock,
  UserFoundResponseStub,
  UserGrpcServiceMock,
  UserUpdateResponseStub,
} from '@app/testing/users';
import { LoggerMock } from '@app/testing/logs';
import { CounterMock } from '@app/testing/measure';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients';

import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';

import { UsersService } from '../users.service';
import {
  FindUserRequestResponse,
  UpdatedUserRequestResponse,
} from '../response';
import { FindUserByIdRequestDtoStub, UpdateUserRequestDtoStub } from './stubs';

describe('UsersService', () => {
  let usersGatewayService: UsersService;

  let userService: UserServiceClient;

  const usersClient = userClientMock();
  const logger = LoggerMock();
  const counter = CounterMock();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CLIENT_PROVIDER.USER,
          useValue: usersClient,
        },
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
        {
          provide: WINSTON_LOGGER,
          useValue: logger,
        },
        {
          provide: getToken(REQUESTS_COUNTER),
          useValue: counter,
        },
      ],
    }).compile();

    usersGatewayService = moduleRef.get<UsersService>(UsersService);
    usersGatewayService.onModuleInit();

    jest.clearAllMocks();
  });

  describe('OnModuleInit', () => {
    beforeEach(() => {
      userService = usersClient.getService(USER_SERVICE_NAME);
    });

    test('then it should intialize all the Gprc clients', () => {
      expect(usersClient.getService).toHaveBeenCalledWith(USER_SERVICE_NAME);
    });
  });

  describe('updateUserDetails', () => {
    describe('when updateUserDetails is called', () => {
      let userUpdateResponse: UpdatedUserRequestResponse;

      const usersUpdateRequestDtoStub = UpdateUserRequestDtoStub();
      const usersUpdateRequestResponseStub = UserUpdateResponseStub();

      beforeEach(async () => {
        userUpdateResponse = await usersGatewayService.updateUserDetails(
          '123abc',
          usersUpdateRequestDtoStub,
        );
      });

      test('then it should increament the counter to update the total requests count', () => {
        expect(counter.inc).toHaveBeenCalledTimes(1);
      });

      test('then it should log that the request was recieved successfully', () => {
        expect(logger.info).toHaveBeenCalledTimes(1);
      });

      test('then it should call usersService', () => {
        expect(userService.updateProfile).toHaveBeenCalledWith({
          id: '123abc',
          ...usersUpdateRequestDtoStub,
        });
      });

      test('then it should return the user profile updated response', () => {
        expect(userUpdateResponse).toEqual(usersUpdateRequestResponseStub);
      });
    });
  });

  describe('getCurrentlyLoggedInUser', () => {
    describe('when getCurrentlyLoggedInUser is called', () => {
      let getCurrentUserResponse: FindUserRequestResponse;

      const getCurrentlyLoggedInUserRequestDtoStub =
        FindUserByIdRequestDtoStub();
      const getCurrentlyLoggedInUserRequestResponseStub =
        UserFoundResponseStub();

      beforeEach(async () => {
        getCurrentUserResponse =
          await usersGatewayService.getCurrentlyLoggedInUser(
            getCurrentlyLoggedInUserRequestDtoStub.id,
          );
      });

      test('then userService should be defined and its function findUserById should also be defined', () => {
        expect(userService).toBeDefined();
        expect(userService == UserGrpcServiceMock()).toBe(true);
        expect(userService.updateProfile).toBeDefined();
        expect(typeof userService.findOneUserById).toBe('function');
      });

      test('then it should call increament the counter to update request count', () => {
        expect(counter.inc).toHaveBeenCalledTimes(1);
      });

      test('then it should log that the request was recieved successfully', () => {
        expect(logger.info).toHaveBeenCalledTimes(1);
      });

      test("then if the userService's findOneUserById is called with proper inputs, it should return the user found response", () => {
        expect(userService.findOneUserById).toHaveBeenCalledWith(
          getCurrentlyLoggedInUserRequestDtoStub,
        );
        expect(getCurrentUserResponse).toEqual(
          getCurrentlyLoggedInUserRequestResponseStub,
        );
      });

      test('then it should return the user found response', () => {});
    });
  });
});
