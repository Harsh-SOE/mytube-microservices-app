import { DomainException } from './domain.exception';

export interface InvalidOwnerIdExceptionOptions {
  message?: string;
  meta?: Record<string, any>;
}

export class InvalidOwnerIdException extends DomainException {
  public constructor(options: InvalidOwnerIdExceptionOptions) {
    const { message = `Invalid owner id was received`, meta } = options || {};
    super({
      code: 'INVALID_INPUT_EXCEPTION',
      message: message,
      meta,
    });
  }
}
