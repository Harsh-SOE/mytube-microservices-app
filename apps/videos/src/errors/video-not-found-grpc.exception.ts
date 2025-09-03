import { BaseGrpcServiceException, ErrorPayload } from '@app/errors';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class VideoNotFoundGrpcException extends BaseGrpcServiceException {
  constructor(
    public readonly message: string,
    public readonly details?: string | Record<string, any>,
  ) {
    const errorPayload: ErrorPayload = {
      errorCode: HttpStatus.NOT_FOUND,
      statusCode: 'VIDEO_NOT_FOUND_EXCEPTION',
      stack: new Error().stack,
    };

    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(errorPayload));

    super(Status.NOT_FOUND, message, metadata);
  }
}
