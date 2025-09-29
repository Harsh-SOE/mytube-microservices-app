import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { RpcException } from '@nestjs/microservices';
import { ErrorPayload } from './grpc-application.exception.type';

export abstract class GrpcApplicationError extends RpcException {
  /**
   * Constructor for the ApplicationError class.
   * @param {Status} code - The Status code for the exception.
   * @param {string} details - The message for the exception.
   * @param {Metadata} errorPayload - The error payload that needs to transffered to other service.
   */
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
  }
}
