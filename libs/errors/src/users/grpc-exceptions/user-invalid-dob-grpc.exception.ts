import { BaseGrpcServiceException, ErrorPayload } from '../../common';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class UserInvalidDOBGrpcException extends BaseGrpcServiceException {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      errorCode: HttpStatus.BAD_REQUEST,
      statusCode: 'USER_INVALID_DOB_EXCEPTION',
      stack: new Error().stack,
    };

    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(payload));
    super(Status.INVALID_ARGUMENT, message, metadata);
  }
}
