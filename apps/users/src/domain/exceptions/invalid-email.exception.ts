import { DomainException } from './domain.exception';

export interface InvalidEmailExceptionOptions {
  message?: string;
  meta?: Record<string, any>;
}

export class InvalidEmailException extends DomainException {
  public constructor(options: InvalidEmailExceptionOptions) {
    const { message = `Invalid email was received`, meta } = options || {};
    super({
      code: 'INVALID_INPUT_EXCEPTION',
      message: message,
      meta,
    });
  }
}
