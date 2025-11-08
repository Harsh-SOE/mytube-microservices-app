import { DomainException } from './domain.exception';

export interface InvalidVideoUrlExceptionOptions {
  message?: string;
  meta?: Record<string, any>;
}

export class InvalidVideoUrlException extends DomainException {
  public constructor(options: InvalidVideoUrlExceptionOptions) {
    const { message = `Invalid video url was received`, meta } = options || {};
    super({
      code: 'INVALID_INPUT_EXCEPTION',
      message: message,
      meta,
    });
  }
}
