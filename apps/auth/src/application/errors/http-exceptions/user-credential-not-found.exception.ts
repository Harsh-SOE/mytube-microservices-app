import { BaseServiceException } from '@app/errors';
import { HttpStatus } from '@nestjs/common';
export class UserCredentialNotFoundException extends BaseServiceException {
  constructor(
    public readonly reason: string,
    public readonly errorCode: number = HttpStatus.NOT_FOUND,
    public readonly statusCode: string = 'USER_CREDENTIALS_NOT_FOUND_EXCEPTION',
    public readonly details?: string | Record<string, any>,
  ) {
    super(statusCode, errorCode, reason, details);
  }
}
