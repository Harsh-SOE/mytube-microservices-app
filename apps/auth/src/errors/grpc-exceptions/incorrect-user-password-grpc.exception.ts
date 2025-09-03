import { BaseGrpcServiceException, ErrorPayload } from '@app/errors';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class IncorrectUserPasswordGrpcException extends BaseGrpcServiceException {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'INCORRECT_PASSWORD_EXCEPTION',
      errorCode: HttpStatus.BAD_REQUEST,
      stack: new Error().stack,
    };

    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(payload));

    super(Status.INVALID_ARGUMENT, message, metadata);
  }
}
