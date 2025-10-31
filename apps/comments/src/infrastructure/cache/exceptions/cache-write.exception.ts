import {
  CACHE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@comments/infrastructure/exceptions';

export type CacheWriteExceptionMetadata = {
  key?: string;
  value?: string;
  errorType?: string;
  host?: string;
  port?: number;
};

export type CacheWriteExceptionOptions = {
  message?: string;
  meta?: CacheWriteExceptionMetadata;
  contextError?: Error;
};

export class CacheWriteException extends InfrastructureException {
  constructor(options: CacheWriteExceptionOptions) {
    const {
      message = 'Unable to write into cache',
      contextError,
      meta,
    } = options;

    super({
      message,
      code: CACHE_EXCEPTION.CACHE_WRITE_EXCEPTION,
      component: 'CACHE',
      operation: 'WRITE',
      severity: InfrastructureOperationFailureLevel.ERROR,
      meta,
      contextError,
    });
  }
}
