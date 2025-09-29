import { GrpcApplicationError, ErrorPayload } from '../../common';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsGrpcException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'USER_ALREADY_EXIST_EXCEPTION',
      errorCode: HttpStatus.CONFLICT,
      stack: new Error().stack,
    };

    super(Status.ALREADY_EXISTS, message, payload);
  }
}
