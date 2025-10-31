import {
  InfrastructureOperationFailureLevel,
  MESSAGE_BROKER_EXCEPTION,
} from '@comments/infrastructure/exceptions';
import { InfrastructureException } from '../../exceptions/infrastructure.exception';

export type MessageBrokerConnectionExceptionMetadata = {
  host?: string;
  port?: number;
  retryAttempt?: number;
};

export type MessageBrokerConnectionExceptionOptions = {
  message?: string;
  meta?: MessageBrokerConnectionExceptionMetadata;
  contextError?: Error;
};

export class MessageBrokerConnectionException extends InfrastructureException {
  constructor(options: MessageBrokerConnectionExceptionOptions) {
    const {
      message = 'Unable to connect to message broker',
      contextError,
      meta,
    } = options;
    super({
      message,
      code: MESSAGE_BROKER_EXCEPTION.MESSAGE_BROKER_CONNECTION_EXCEPTION,
      component: 'MESSAGE BROKER',
      operation: 'Connection',
      severity: InfrastructureOperationFailureLevel.FATAL,
      meta,
      contextError,
    });
  }
}
