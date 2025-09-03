import { BaseServiceException } from '../../common';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends BaseServiceException {
  constructor(
    public readonly reason: string,
    public readonly errorCode: number = HttpStatus.CONFLICT,
    public readonly statusCode: string = 'USER_ALREADY_EXIST_EXCEPTION',
    public readonly details?: string | Record<string, any>,
  ) {
    super(statusCode, errorCode, reason, details);
  }
}
