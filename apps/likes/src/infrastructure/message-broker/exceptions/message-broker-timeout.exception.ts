import {
  InfrastructureOperationFailureLevel,
  MESSAGE_BROKER_EXCEPTION,
  InfrastructureException,
} from '@likes/infrastructure/exceptions';

export type MessageBrokerTimeoutExceptionMetadata = {
  topic?: string;
  message?: string;
  host?: string;
  port?: number;
  retryAttempt?: number;
};

export type MessageBrokerTimeoutExceptionOptions = {
  message: string;
  contextError?: Error;
  operation?: string;
  meta?: MessageBrokerTimeoutExceptionMetadata;
};

export class MessageBrokerTimeoutException extends InfrastructureException {
  constructor(options: MessageBrokerTimeoutExceptionOptions) {
    const { message, contextError, operation, meta } = options;
    super({
      message,
      code: MESSAGE_BROKER_EXCEPTION.CACHE_TIMEOUT_EXCEPTION,
      component: 'MESSAGE_BROKER',
      operation,
      severity: InfrastructureOperationFailureLevel.ERROR,
      contextError,
      meta,
    });
  }
}
