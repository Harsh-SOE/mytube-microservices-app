import {
  UserFindByIdDto,
  UserServiceClient,
  UserUpdateDto,
} from '@app/contracts/users';
import { of } from 'rxjs';
import { UserFoundResponseStub, UserUpdateResponseStub } from '../stubs';
import { BadRequestException } from '@nestjs/common';
import { UserNotFoundGrpcException } from '@app/errors';

// TODO: Should also test case where database connection was dropped or any other database error occured
export const UserGrpcServiceMock = (): Pick<
  UserServiceClient,
  'updateUserProfile' | 'findOneUserById' | 'findAllUsers'
> => {
  return {
    updateUserProfile: jest
      .fn()
      .mockImplementation((userUpdateDto: UserUpdateDto) => {
        // this error should never happen as service trust the gateway, and will always recieve only the valid data
        if (!userUpdateDto || userUpdateDto.id) {
          throw new BadRequestException(`id is required for updating a user`);
        }

        const id = userUpdateDto.id;
        if (id === 'non-exsistent-user-id') {
          throw new UserNotFoundGrpcException(
            `User with id:${id} was not found in the database`,
          );
        }
      })
      .mockReturnValue(of(UserUpdateResponseStub())),
    findAllUsers: jest.fn().mockReturnValue(of([UserFoundResponseStub()])),
    findOneUserById: jest
      .fn()
      .mockImplementation((userFindByIdDto: UserFindByIdDto) => {
        // this error should never happen as service trust the gateway, and will always recieve only the valid data
        if (!userFindByIdDto || !userFindByIdDto.id) {
          throw new BadRequestException(
            `id is required inorder to find a user`,
          );
        }
        // 1. User not found exception
        const id = userFindByIdDto.id;
        if (id === 'non-exsistent-user-id') {
          throw new UserNotFoundGrpcException(
            `User with id:${id} was not found in the database`,
          );
        }
        // TODO: 2. Database error
      })
      .mockReturnValue(of(UserFoundResponseStub())),
  };
};
