import { GrpcApplicationError, ErrorPayload } from '../../common';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundGrpcException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'USER_NOT_FOUND_EXCEPTION',
      errorCode: HttpStatus.NOT_FOUND,
      stack: new Error().stack,
    };
    super(Status.NOT_FOUND, message, payload);
  }
}
