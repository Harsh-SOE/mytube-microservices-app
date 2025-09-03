import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { RpcException } from '@nestjs/microservices';

export abstract class BaseGrpcServiceException extends RpcException {
  constructor(
    public readonly code: Status,
    public readonly message: string,
    public readonly metadata: Metadata,
  ) {
    super({
      message,
      code,
      metadata: metadata,
    });
  }
}
