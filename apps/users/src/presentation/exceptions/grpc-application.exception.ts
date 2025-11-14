import { RpcException } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

import { ErrorPayload } from '../types';

export class GrpcApplicationException extends RpcException {
  private metadata: Metadata;
  constructor(
    public readonly code: Status,
    public readonly details: string,
    public readonly errorPayload: ErrorPayload,
  ) {
    const metadata = new Metadata();
    metadata.add('error-payload', JSON.stringify(errorPayload));
    super({
      code,
      details,
      metadata,
    });
    this.metadata = metadata;
  }

  getError(): { code: Status; metadata: Metadata; details: string } {
    return {
      code: this.code,
      details: this.details,
      metadata: this.metadata,
    };
  }
}
