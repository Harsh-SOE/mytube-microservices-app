import { BaseServiceException } from '@app/errors';
import { HttpStatus } from '@nestjs/common';
export class IncorrectUserPasswordException extends BaseServiceException {
  constructor(
    public readonly message: string,
    public readonly errorCode: number = HttpStatus.BAD_REQUEST,
    public readonly statusCode: string = 'INCORRECT_PASSWORD_EXCEPTION',
    public readonly details?: string | Record<string, any>,
  ) {
    super(statusCode, errorCode, message, details);
  }
}
