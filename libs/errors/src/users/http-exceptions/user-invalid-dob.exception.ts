import { BaseServiceException } from '../../common';
import { HttpStatus } from '@nestjs/common';

export class UserInvalidDOBException extends BaseServiceException {
  constructor(
    public readonly reason: string,
    public readonly errorCode: number = HttpStatus.BAD_REQUEST,
    public readonly statusCode: string = 'USER_INVALID_DOB_EXCEPTION',
    public readonly details?: string | Record<string, any>,
  ) {
    super(statusCode, errorCode, reason, details);
  }
}
