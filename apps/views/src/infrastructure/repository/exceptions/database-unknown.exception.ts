import { Components } from '@views/infrastructure/config';
import {
  DATABASE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@views/infrastructure/exceptions';

export type DatabaseUnknownExceptionMetaData = {
  host?: string;
  port?: number;
  retryAttempt?: number;
};

export type DatabaseUnknownExceptionOptions = {
  message?: string;
  meta?: DatabaseUnknownExceptionMetaData;
  contextError?: Error;
  operation?: string;
};

export class DatabaseUnknownException extends InfrastructureException {
  public constructor(options: DatabaseUnknownExceptionOptions) {
    const {
      message = `An unknown database error has occured`,
      contextError,
      meta,
      operation,
    } = options;

    super({
      code: DATABASE_EXCEPTION.DATABASE_UNKNOWN_EXCEPTION,
      message,
      component: Components.DATABASE,
      operation: operation || 'unknown',
      severity: InfrastructureOperationFailureLevel.ERROR,
      contextError,
      meta,
    });
  }
}
