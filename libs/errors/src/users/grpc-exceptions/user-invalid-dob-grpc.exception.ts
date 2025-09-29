import { GrpcApplicationError, ErrorPayload } from '../../common';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserInvalidDOBGrpcException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      errorCode: HttpStatus.BAD_REQUEST,
      statusCode: 'USER_INVALID_DOB_EXCEPTION',
      stack: new Error().stack,
    };

    super(Status.INVALID_ARGUMENT, message, payload);
  }
}
