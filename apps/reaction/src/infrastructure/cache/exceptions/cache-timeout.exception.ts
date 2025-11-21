import {
  CACHE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@reaction/infrastructure/exceptions';

export type CacheTimeOutExceptionMetadata = {
  host?: string;
  port?: number;
  retryAttempt?: number;
  key?: string;
  value?: string;
};

export type CacheTimeOutExceptionOptions = {
  message?: string;
  meta?: CacheTimeOutExceptionMetadata;
  contextError?: Error;
};

export class CacheTimeoutException extends InfrastructureException {
  constructor(options: CacheTimeOutExceptionOptions) {
    const {
      message = 'Cache operation timed out',
      meta,
      contextError,
    } = options;
    super({
      message,
      code: CACHE_EXCEPTION.CACHE_TIMEOUT_EXCEPTION,
      component: 'CACHE',
      operation: 'WRITE',
      severity: InfrastructureOperationFailureLevel.ERROR,
      meta,
      contextError,
    });
  }
}
