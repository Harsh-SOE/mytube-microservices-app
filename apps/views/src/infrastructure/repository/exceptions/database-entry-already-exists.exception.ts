import { Components } from '@views/infrastructure/config';
import {
  DATABASE_EXCEPTION,
  InfrastructureException,
  InfrastructureOperationFailureLevel,
} from '@views/infrastructure/exceptions';

export type DatabaseEntryAlreadyExistsExceptionMetaData = {
  host?: string;
  port?: number;
  retryAttempt?: number;
  entityToCreate?: any;
};

export type DatabaseEntryAlreadyExistsExceptionOptions = {
  message?: string;
  meta?: DatabaseEntryAlreadyExistsExceptionMetaData;
  contextError?: Error;
};

export class DatabaseEntryAlreadyExistsException extends InfrastructureException {
  public constructor(options: DatabaseEntryAlreadyExistsExceptionOptions) {
    const { message = `Entry already exists`, contextError, meta } = options;

    super({
      code: DATABASE_EXCEPTION.DATABASE_ENTRY_ALREADY_EXISTS_EXCEPTION,
      message,
      component: Components.DATABASE,
      operation: 'save',
      severity: InfrastructureOperationFailureLevel.ERROR,
      contextError,
      meta,
    });
  }
}
