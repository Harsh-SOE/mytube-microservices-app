import { GrpcApplicationError, ErrorPayload } from '@app/errors';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class IncorrectPasswordException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'INCORRECT_PASSWORD_EXCEPTION',
      errorCode: HttpStatus.BAD_REQUEST,
      stack: new Error().stack,
    };

    super(Status.INVALID_ARGUMENT, message, payload);
  }
}
