import {
  InfrastructureOperationFailureLevel,
  MESSAGE_BROKER_EXCEPTION,
} from '@comments/infrastructure/exceptions';

import { InfrastructureException } from '../../exceptions/infrastructure.exception';

export type MessageBrokerUnknownExceptionMetadata = {
  topic?: string;
  message?: string;
  host?: string;
  port?: number;
  retryAttempt?: number;
};

export type MessageBrokerUnknownExceptionOptions = {
  message?: string;
  contextError?: Error;
  operation?: string;
  meta?: MessageBrokerUnknownExceptionMetadata;
};

export class MessageBrokerUnknownException extends InfrastructureException {
  constructor(options: MessageBrokerUnknownExceptionOptions) {
    const {
      message = 'An error occured in message broker',
      meta,
      contextError,
      operation,
    } = options;
    super({
      message,
      code: MESSAGE_BROKER_EXCEPTION.MESSAGE_BROKER_UNKNOWN_EXCEPTION,
      contextError,
      meta,
      component: 'MESSAGE_BROKER',
      operation,
      severity: InfrastructureOperationFailureLevel.ERROR,
    });
  }
}
