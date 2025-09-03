import { BaseGrpcServiceException, ErrorPayload } from '../../common';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundGrpcException extends BaseGrpcServiceException {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'USER_NOT_FOUND_EXCEPTION',
      errorCode: HttpStatus.NOT_FOUND,
      stack: new Error().stack,
    };
    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(payload));
    super(Status.NOT_FOUND, message, metadata);
  }
}
