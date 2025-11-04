import { Components } from '@likes/infrastructure/config';
import {
  BUFFER_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@likes/infrastructure/exceptions';

export type BufferTimeOutExceptionMetadata = {
  valueToBuffer?: string;
  host?: string;
  port?: number;
  retryAttempt?: number;
};

export type BufferTimeOutExceptionOptions = {
  message?: string;
  meta?: BufferTimeOutExceptionMetadata;
  contextError?: Error;
  operation?: string;
};

export class BufferTimeoutException extends InfrastructureException {
  constructor(options: BufferTimeOutExceptionOptions) {
    const {
      message = 'Buffer operation timed out',
      meta,
      contextError,
      operation,
    } = options;
    super({
      message,
      code: BUFFER_EXCEPTION.BUFFER_TIMEOUT_EXCEPTION,
      component: Components.BUFFER,
      operation,
      severity: InfrastructureOperationFailureLevel.ERROR,
      meta,
      contextError,
    });
  }
}
