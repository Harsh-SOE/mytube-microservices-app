import { Components } from '@likes/infrastructure/config';
import {
  BUFFER_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@likes/infrastructure/exceptions';

export type BufferUnknownExceptionMetadata = {
  valueToBuffer?: string;
  errorType?: string;
  host?: string;
  port?: number;
};

export type BufferUnknownExceptionOptions = {
  message?: string;
  operation?: string;
  meta?: BufferUnknownExceptionMetadata;
  contextError?: Error;
};

export class BufferUnknownException extends InfrastructureException {
  constructor(options: BufferUnknownExceptionOptions) {
    const {
      message = 'Something went wrong while performing buffer operation',
      operation,
      contextError,
      meta,
    } = options;
    super({
      message,
      code: BUFFER_EXCEPTION.BUFFER_UNKNOWN_EXCEPTION,
      component: Components.BUFFER,
      operation,
      severity: InfrastructureOperationFailureLevel.ERROR,
      meta,
      contextError,
    });
  }
}
