import { GrpcApplicationError, ErrorPayload } from '../../common';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserEntityInvalidInputException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'USER_INVALID_INPUT_EXCEPTION',
      errorCode: HttpStatus.BAD_REQUEST,
      stack: new Error().stack,
    };

    super(Status.INTERNAL, message, payload);
  }
}
