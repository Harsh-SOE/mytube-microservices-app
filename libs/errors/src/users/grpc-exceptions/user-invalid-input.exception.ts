import { BaseGrpcServiceException, ErrorPayload } from '../../common';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserEntityInvalidInputException extends BaseGrpcServiceException {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'USER_INVALID_INPUT_EXCEPTION',
      errorCode: HttpStatus.BAD_REQUEST,
      stack: new Error().stack,
    };

    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(payload));

    super(Status.INTERNAL, message, metadata);
  }
}
