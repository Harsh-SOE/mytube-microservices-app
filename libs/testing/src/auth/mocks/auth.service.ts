import { of } from 'rxjs';

import { AuthServiceClient } from '@app/contracts/auth';

import {
  AuthChangePasswordResponseStub,
  AuthSigninResponseStub,
} from '../stubs';

export const AuthGrpcServiceMock = (): Pick<
  AuthServiceClient,
  'signin' | 'changePassword'
> => ({
  signin: jest.fn().mockReturnValue(of(AuthSigninResponseStub())), // of() will mock observable
  changePassword: jest
    .fn()
    .mockResolvedValue(of(AuthChangePasswordResponseStub())),
});
