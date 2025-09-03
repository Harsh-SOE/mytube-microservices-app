import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export abstract class BaseServiceException extends RpcException {
  constructor(
    public readonly statusCode: string,
    public readonly errorCode: number | HttpStatus,
    public readonly message: string,
    public readonly details?: string | Record<string, any>,
  ) {
    super({
      success: false,
      message,
      statusCode,
      errorCode,
      details,
      stack: new Error().stack,
    });
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
