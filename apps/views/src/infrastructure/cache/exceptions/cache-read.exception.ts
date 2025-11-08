import {
  CACHE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@views/infrastructure/exceptions';

export type CacheReadOperationMetadata = {
  host?: string;
  port?: number;
  retryAttempt?: number;
  key?: string | string[];
  errorType?: string;
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
