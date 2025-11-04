import { Components } from '@likes/infrastructure/config';
import {
  BUFFER_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@likes/infrastructure/exceptions';

export type BufferWriteExceptionMetadata = {
  valueToBuffer?: string;
  errorType?: string;
  host?: string;
  port?: number;
};

export type BufferSaveExceptionOptions = {
  message?: string;
  meta?: BufferWriteExceptionMetadata;
  contextError?: Error;
};

export class BufferSaveException extends InfrastructureException {
  constructor(options: BufferSaveExceptionOptions) {
    const {
      message = 'Unable to write into buffer',
      contextError,
      meta,
    } = options;

    super({
      message,
      code: BUFFER_EXCEPTION.BUFFER_SAVE_EXCEPTION,
      component: Components.BUFFER,
      operation: 'SAVE',
      severity: InfrastructureOperationFailureLevel.ERROR,
      meta,
      contextError,
    });
  }
}
