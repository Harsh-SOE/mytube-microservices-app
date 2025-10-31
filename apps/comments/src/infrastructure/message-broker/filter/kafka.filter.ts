import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {
  KafkaJSConnectionError,
  KafkaJSError,
  KafkaJSRequestTimeoutError,
} from 'kafkajs';
import {
  MessageBrokerTimeoutException,
  MessageBrokerUnknownException,
} from '../exceptions';

@Catch(KafkaJSError)
export class KafkaExceptionFilter implements ExceptionFilter {
  catch(exception: KafkaJSError, host: ArgumentsHost) {
    const ctx = host.switchToRpc();

    switch (true) {
      case exception instanceof KafkaJSConnectionError:
        // Note: We can't easily get AppConfigService here
        // without more advanced DI setup (see below).
        // For now, we omit the host/port.
        throw new MessageBrokerTimeoutException({
          message: `Unable to connect to kafka broker: ${exception.broker}`,
          contextError: exception,
          meta: {
            // host/port are harder to get here,
            // but the error message itself is very informative.
          },
        });

      case exception instanceof KafkaJSRequestTimeoutError:
        throw new MessageBrokerTimeoutException({
          message: `Request timed out for kafka broker: ${exception.broker}`,
          contextError: exception,
          meta: { message: exception.message },
        });

      default:
        throw new MessageBrokerUnknownException({
          message: `An Unknown error occured with Kafka`,
          contextError: exception as Error,
          meta: {},
        });
    }
  }
}
