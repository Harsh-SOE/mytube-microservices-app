import { Components } from '@reaction/infrastructure/config';
import {
  DATABASE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@reaction/infrastructure/exceptions';

export type DatabaseConnectionExceptionMetaData = {
  host?: string;
  port?: number;
  retryAttempt?: number;
};

export type DatabaseConnectionExceptionOptions = {
  message?: string;
  meta?: DatabaseConnectionExceptionMetaData;
  contextError?: Error;
};

export class DatabaseConnectionException extends InfrastructureException {
  constructor(options: DatabaseConnectionExceptionOptions) {
    const {
      message = `Unable to connect to database`,
      contextError,
      meta,
    } = options;

    super({
      code: DATABASE_EXCEPTION.DATABASE_CONNECTION_EXCEPTION,
      message,
      component: Components.DATABASE,
      operation: 'connection',
      severity: InfrastructureOperationFailureLevel.FATAL,
      contextError,
      meta,
    });
  }
}
