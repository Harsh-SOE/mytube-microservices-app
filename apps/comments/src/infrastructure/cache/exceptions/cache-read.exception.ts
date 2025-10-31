import {
  CACHE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@comments/infrastructure/exceptions';

export type CacheReadOperationMetadata = {
  key?: string;
  errorType?: string;
  host?: string;
  port?: number;
  retryAttempt?: number;
};

export type CachReadExceptionOptions = {
  message?: string;
  meta?: CacheReadOperationMetadata;
  contextError?: Error;
};

export class CacheReadException extends InfrastructureException {
  constructor(options: CachReadExceptionOptions) {
    const {
      message = `Unable to read from cache`,
      meta,
      contextError,
    } = options;
    super({
      message,
      code: CACHE_EXCEPTION.CACHE_READ_EXCEPTION,
      component: 'CACHE',
      operation: 'READ',
      severity: InfrastructureOperationFailureLevel.ERROR,
      meta,
      contextError,
    });
  }
}
