import { BaseServiceException } from '@app/errors';
import { HttpStatus } from '@nestjs/common';

export class VideoNotFoundException extends BaseServiceException {
  constructor(
    public readonly reason: string,
    public readonly errorCode: number = HttpStatus.NOT_FOUND,
    public readonly statusCode: string = 'VIDEO_NOT_FOUND_EXCEPTION',
    public readonly details?: string | Record<string, any>,
  ) {
    super(statusCode, errorCode, reason, details);
  }
}
