import { HttpStatus } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

import { BaseGrpcServiceException } from '@app/errors';

export class LikeNotFoundGrpcException extends BaseGrpcServiceException {
  constructor(
    public readonly message: string,
    public readonly details?: string | Record<string, any>,
  ) {
    const errorPayload = {
      statusCode: 'LIKE_NOT_FOUND_EXCEPTION',
      errorCode: HttpStatus.NOT_FOUND,
    };

    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(errorPayload));

    super(Status.NOT_FOUND, message, metadata);
  }
}
