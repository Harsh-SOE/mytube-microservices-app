import { HttpStatus } from '@nestjs/common';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { GrpcApplicationError, ErrorPayload } from '@app/errors';

export class DatabaseConnectionFailedException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'DATABASE_CONNECTION_EXCEPTION',
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
      stack: new Error().stack,
    };

    super(Status.INTERNAL, message, payload);
  }
}
