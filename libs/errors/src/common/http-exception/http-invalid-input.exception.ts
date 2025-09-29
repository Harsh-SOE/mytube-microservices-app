import { HttpStatus } from '@nestjs/common';
import { BaseServiceException } from './http-application.exception';

export class InvalidInputException extends BaseServiceException {
  constructor(
    public readonly reason: string,
    public readonly errorCode: number = HttpStatus.BAD_REQUEST,
    public readonly statusCode: string = 'INVALID_INPUT_EXCEPTION',
    public readonly details?: string | Record<string, any>,
  ) {
    super(statusCode, errorCode, reason, details);
  }
}
