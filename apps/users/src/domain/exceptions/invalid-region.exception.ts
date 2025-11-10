import { DomainException } from './domain.exception';

export interface InvalidRegionExceptionOptions {
  message?: string;
  meta?: Record<string, any>;
}

export class InvalidRegionException extends DomainException {
  public constructor(options: InvalidRegionExceptionOptions) {
    const { message = `Invalid region was received`, meta } = options || {};
    super({
      code: 'INVALID_INPUT_EXCEPTION',
      message: message,
      meta,
    });
  }
}
