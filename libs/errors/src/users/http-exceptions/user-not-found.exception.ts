import { BaseServiceException } from '../../common';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends BaseServiceException {
  constructor(
    public readonly message: string,
    public readonly errorCode: number = HttpStatus.NOT_FOUND,
    public readonly statusCode: string = 'USER_NOT_FOUND_EXCEPTION',
    public readonly details?: string | Record<string, any>,
  ) {
    super(statusCode, errorCode, message, details);
  }
}
