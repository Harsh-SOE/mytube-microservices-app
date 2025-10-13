import { HttpStatus } from '@nestjs/common';
import { Status } from '@grpc/grpc-js/build/src/constants';

import { GrpcApplicationError, ErrorPayload } from '../../common';

export class UserAlreadyExistsGrpcException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const payload: ErrorPayload = {
      statusCode: 'USER_ALREADY_EXIST_EXCEPTION',
      errorCode: HttpStatus.CONFLICT,
      stack: new Error().stack,
    };

    super(Status.ALREADY_EXISTS, message, payload);
  }
}
