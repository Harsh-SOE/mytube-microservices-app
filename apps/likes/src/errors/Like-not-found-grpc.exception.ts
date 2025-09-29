import { HttpStatus } from '@nestjs/common';
import { Status } from '@grpc/grpc-js/build/src/constants';

import { GrpcApplicationError } from '@app/errors';

export class LikeNotFoundGrpcException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const errorPayload = {
      statusCode: 'LIKE_NOT_FOUND_EXCEPTION',
      errorCode: HttpStatus.NOT_FOUND,
    };

    super(Status.NOT_FOUND, message, errorPayload);
  }
}
