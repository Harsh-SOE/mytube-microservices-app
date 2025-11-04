import { DomainException } from './domain.exception';

export interface InvalidLikeStatusExceptionOptions {
  message?: string;
  meta?: Record<string, any>;
}

export class InvalidLikeStatusException extends DomainException {
  public constructor(options: InvalidLikeStatusExceptionOptions) {
    const { message = `Invalid like status was received`, meta } =
      options || {};
    super({
      code: 'INVALID_INPUT_EXCEPTION',
      message: message,
      meta,
    });
  }
}
