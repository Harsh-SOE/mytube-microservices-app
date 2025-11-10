import { DomainException } from './domain.exception';

export interface InvalidDobExceptionOptions {
  message?: string;
  meta?: Record<string, any>;
}

export class InvalidDobException extends DomainException {
  public constructor(options: InvalidDobExceptionOptions) {
    const { message = `Invalid dob was received`, meta } = options || {};
    super({
      code: 'INVALID_INPUT_EXCEPTION',
      message: message,
      meta,
    });
  }
}
