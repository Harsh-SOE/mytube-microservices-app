import { BaseServiceException } from '@app/errors';
import { HttpStatus } from '@nestjs/common';
export class UnauthorizedException extends BaseServiceException {
  constructor(
    public readonly reason: string,
    public readonly errorCode: number = HttpStatus.UNAUTHORIZED,
    public readonly statusCode: string = 'UNAUTHORIZED_EXCEPTION',
    public readonly details?: string | Record<string, any>,
  ) {
    super(statusCode, errorCode, reason, details);
  }
}
