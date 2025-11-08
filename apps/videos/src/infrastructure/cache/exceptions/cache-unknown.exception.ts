import {
  CACHE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@videos/infrastructure/exceptions';

export type CacheUnknownExceptionMetadata = {
  host?: string;
  port?: number;
  key?: string;
  value?: string;
  errorType?: string;
};

export type CacheUnknownExceptionOptions = {
  message?: string;
  operation: string;
  meta?: CacheUnknownExceptionMetadata;
  contextError?: Error;
};

export class CacheUnknownException extends InfrastructureException {
  constructor(options: CacheUnknownExceptionOptions) {
    const {
      message = 'Something went wrong while performing cache operation',
      operation,
      contextError,
      meta,
    } = options;
    super({
      message,
      code: CACHE_EXCEPTION.CACHE_UNKNOWN_EXCEPTION,
      component: 'CACHE',
      operation,
      severity: InfrastructureOperationFailureLevel.ERROR,
      meta,
      contextError,
    });
  }
}
