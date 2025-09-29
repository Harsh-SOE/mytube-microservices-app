import { GrpcApplicationError, ErrorPayload } from '@app/errors';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserCredentialNotFoundException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      errorCode: HttpStatus.NOT_FOUND,
      statusCode: 'USER_CREDENTIALS_NOT_FOUND_EXCEPTION',
      stack: new Error().stack,
    };
    super(Status.NOT_FOUND, message, payload);
  }
}
