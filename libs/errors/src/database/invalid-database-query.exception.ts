import { HttpStatus } from '@nestjs/common';
import { Status } from '@grpc/grpc-js/build/src/constants';

import { GrpcApplicationError, ErrorPayload } from '../common';

export class InvalidDatabaseQueryException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'INVALID_DATABASE_QUERY_EXCEPTION',
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
      stack: new Error().stack,
    };

    super(Status.INTERNAL, message, payload);
  }
}
