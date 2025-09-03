/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { getToken } from '@willsoto/nestjs-prometheus';

import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients';

import { SAGA_SERVICE_NAME, SagaServiceClient } from '@app/contracts/saga';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/contracts/auth';

/* testing stubs for requests and responses with mocks for services and clients */
import {
  SagaSignupDtoStub,
  SagaSignupResponseStub,
} from '@app/testing/saga/stubs';
import { CounterMock } from '@app/testing/measure';
import { LoggerMock } from '@app/testing/logs';
import { AuthClientMock } from '@app/testing/auth';
import { SagaClientMock } from '@app/testing/saga';

import { AuthService } from '../auth.service';
import { REQUESTS_COUNTER } from '../../measure/custom/constants';
import { SigninRequestResponseStub, SigninRequestStub } from './stubs';
import { SigninRequestResponse, SignupRequestResponse } from '../response';

describe('AuthService', () => {
  let authGatewayService: AuthService;

  let authService: AuthServiceClient;
  let sagaService: SagaServiceClient;

  const sagaClient = SagaClientMock();
  const authClient = AuthClientMock();

  const logger = LoggerMock();
  const counter = CounterMock();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: CLIENT_PROVIDER.AUTH, useValue: authClient },
        { provide: CLIENT_PROVIDER.SAGA, useValue: sagaClient },
        { provide: WINSTON_LOGGER, useValue: logger },
        { provide: getToken(REQUESTS_COUNTER), useValue: counter },
      ],
    }).compile();

    authGatewayService = moduleRef.get<AuthService>(AuthService);
    authGatewayService.onModuleInit();

    jest.clearAllMocks();
  });

  describe('onModuleInit', () => {
    beforeEach(() => {
      authService = authClient.getService(AUTH_SERVICE_NAME);
      sagaService = sagaClient.getService(SAGA_SERVICE_NAME);
    });
    test('then it should initialize the Grpc clients for auth and saga', () => {
      expect(authClient.getService).toHaveBeenCalledWith(AUTH_SERVICE_NAME);
      expect(sagaClient.getService).toHaveBeenCalledWith(SAGA_SERVICE_NAME);
    });
  });

  describe('signup', () => {
    describe('when signup is called', () => {
      let signupResponse: SignupRequestResponse;

      const sagaSignupInput = SagaSignupDtoStub();
      const sagaSignupExpectedResponse = SagaSignupResponseStub();

      beforeEach(async () => {
        signupResponse = await authGatewayService.signup(sagaSignupInput);
      });

      test('should increament the counter for total requests', () => {
        expect(counter.inc).toHaveBeenCalledTimes(1);
      });

      test('should log that the request was recieved', () => {
        expect(logger.info).toHaveBeenCalled();
      });

      test('then saga service was called with proper inputs', () => {
        expect(sagaService.userSignupFlow).toHaveBeenCalledWith(
          sagaSignupInput,
        );
      });

      test('then it should return signup response', () => {
        expect(signupResponse).toEqual(sagaSignupExpectedResponse);
      });
    });
  });

  describe('signin', () => {
    describe('when signin is called', () => {
      let signinResponse: SigninRequestResponse;

      const signinRequestInput = SigninRequestStub();
      const siginRequestExpectedResponse = SigninRequestResponseStub();

      beforeEach(async () => {
        signinResponse = await authGatewayService.signin(signinRequestInput);
      });

      test('should increament the counter for total requests', () => {
        expect(counter.inc).toHaveBeenCalledTimes(1);
      });

      test('then it log that the request was recieved successfully', () => {
        expect(logger.info).toHaveBeenCalled();
      });

      test('then it should call auth service', () => {
        expect(authService.signin).toHaveBeenCalledWith(signinRequestInput);
      });

      test('it should return the user login response', () => {
        expect(signinResponse).toEqual(siginRequestExpectedResponse);
      });
    });
  });
});
