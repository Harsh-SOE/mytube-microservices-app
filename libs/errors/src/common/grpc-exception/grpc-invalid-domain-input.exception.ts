import { GrpcApplicationError } from './grpc-application.exception';
import { ErrorPayload } from './grpc-application.exception.type';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class InvalidDomainInputException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'INVALID_DOMAIN_INPUT_EXCEPTION',
      errorCode: HttpStatus.BAD_REQUEST,
      stack: new Error().stack,
    };

    super(Status.INTERNAL, message, payload);
  }
}
