import { HttpStatus } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { BaseGrpcServiceException, ErrorPayload } from '@app/errors';

export class DatabaseException extends BaseGrpcServiceException {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'DATABASE_EXCEPTION',
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
      stack: new Error().stack,
    };

    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(payload));

    super(Status.INTERNAL, message, metadata);
  }
}
