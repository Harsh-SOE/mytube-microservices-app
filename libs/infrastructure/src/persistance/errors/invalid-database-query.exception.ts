import { Components } from '@likes/infrastructure/config';
import {
  DATABASE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@likes/infrastructure/exceptions';

export type DatabaseInvalidExceptionExceptionMetaData = {
  host?: string;
  port?: number;
  query?: string;
  retryAttempt?: number;
};

export type DatabaseInvalidExceptionExceptionOptions = {
  message?: string;
  meta?: DatabaseInvalidExceptionExceptionMetaData;
  contextError?: Error;
  operation?: string;
};

export class DatabaseInvalidQueryException extends InfrastructureException {
  constructor(options: DatabaseInvalidExceptionExceptionOptions) {
    const {
      message = `An unknown database error has occured`,
      contextError,
      meta,
      operation,
    } = options;

    super({
      code: DATABASE_EXCEPTION.DATABASE_INVALID_QUERY_EXCEPTION,
      message,
      component: Components.DATABASE,
      operation: operation || 'unknown',
      severity: InfrastructureOperationFailureLevel.ERROR,
      contextError,
      meta,
    });
  }
}
