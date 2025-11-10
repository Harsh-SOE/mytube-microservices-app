import { DomainException } from './domain.exception';

export interface InvalidThemePreferenceExceptionOptions {
  message?: string;
  meta?: Record<string, any>;
}

export class InvalidThemePreferenceException extends DomainException {
  public constructor(options: InvalidThemePreferenceExceptionOptions) {
    const { message = `Invalid region was received`, meta } = options || {};
    super({
      code: 'INVALID_INPUT_EXCEPTION',
      message: message,
      meta,
    });
  }
}
