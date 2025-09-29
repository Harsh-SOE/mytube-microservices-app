import { GrpcApplicationError, ErrorPayload } from '@app/errors';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export class VideoNotFoundGrpcException extends GrpcApplicationError {
  constructor(public readonly message: string) {
    const errorPayload: ErrorPayload = {
      errorCode: HttpStatus.NOT_FOUND,
      statusCode: 'VIDEO_NOT_FOUND_EXCEPTION',
      stack: new Error().stack,
    };

    super(Status.NOT_FOUND, message, errorPayload);
  }
}
