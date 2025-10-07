import { UserServiceClient } from '@app/contracts/users';
import { of } from 'rxjs';
import { UserFoundResponseStub, UserUpdateResponseStub } from '../stubs';

export const UserGrpcServiceMock = (): Pick<
  UserServiceClient,
  'updateProfile' | 'findOneUserById' | 'findAllUsers'
> => {
  return {
    updateProfile: jest.fn().mockReturnValue(of(UserUpdateResponseStub())),
    findAllUsers: jest.fn().mockReturnValue(of([UserFoundResponseStub()])),
    findOneUserById: jest.fn().mockReturnValue(of(UserFoundResponseStub())),
  };
};
