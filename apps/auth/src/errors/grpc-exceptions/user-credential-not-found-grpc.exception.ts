import { BaseGrpcServiceException, ErrorPayload } from '@app/errors';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserCredentialNotFoundGrpcException extends BaseGrpcServiceException {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      errorCode: HttpStatus.NOT_FOUND,
      statusCode: 'USER_CREDENTIALS_NOT_FOUND_EXCEPTION',
      stack: new Error().stack,
    };

    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(payload));
    super(Status.NOT_FOUND, message, metadata);
  }
}
