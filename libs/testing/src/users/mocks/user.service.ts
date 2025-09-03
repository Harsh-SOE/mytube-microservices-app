import { UserServiceClient } from '@app/contracts/users';
import { of } from 'rxjs';
import { UserFoundResponseStub, UserUpdateResponseStub } from '../stubs';

export const UserGrpcServiceMock = (): Pick<
  UserServiceClient,
  'updateUserProfile' | 'findOneUserById' | 'findAllUsers'
> => {
  return {
    updateUserProfile: jest.fn().mockReturnValue(of(UserUpdateResponseStub())),
    findAllUsers: jest.fn().mockReturnValue(of([UserFoundResponseStub()])),
    findOneUserById: jest.fn().mockReturnValue(of(UserFoundResponseStub())),
  };
};
