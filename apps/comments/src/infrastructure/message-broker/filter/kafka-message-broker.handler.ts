import { KafkaJSConnectionError, KafkaJSRequestTimeoutError } from 'kafkajs';
import {
  MessageBrokerTimeoutException,
  MessageBrokerUnknownException,
} from '../exceptions';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@comments/infrastructure/config';

@Injectable()
export class KafkaMessageHandler {
  public constructor(private readonly configService: AppConfigService) {}

  public kafkaMessageHandler<TKafkaResult>(
    kafkaOperation: () => TKafkaResult | Promise<TKafkaResult>,
  ) {
    try {
      return kafkaOperation();
    } catch (error) {
      switch (true) {
        case error instanceof KafkaJSConnectionError:
          throw new MessageBrokerTimeoutException({
            message: `Unable to connect to kafka broker: ${error.broker}`,
            contextError: error,
            meta: {
              host: this.configService.MESSAGE_BROKER_SERVICE_HOST,
              port: this.configService.MESSAGE_BROKER_SERVICE_PORT,
            },
          });

        case error instanceof KafkaJSRequestTimeoutError:
          throw new MessageBrokerTimeoutException({
            message: `Request timed out for kafka broker: ${error.broker}`,
            contextError: error,
            meta: {
              host: this.configService.MESSAGE_BROKER_SERVICE_HOST,
              port: this.configService.MESSAGE_BROKER_SERVICE_PORT,
              message: error.message,
            },
          });

        default:
          throw new MessageBrokerUnknownException({
            message: `An Unknown error occured while executing kafka operation`,
            contextError: error as Error,
            meta: {},
          });
      }
    }
  }
}

export async function kafkaMessageHandler<TKafkaResult>(
  kafkaOperation: () => TKafkaResult | Promise<TKafkaResult>,
) {
  try {
    return await kafkaOperation();
  } catch (error) {
    switch (true) {
      case error instanceof KafkaJSConnectionError:
        throw new MessageBrokerTimeoutException({
          message: `Unable to connect to kafka broker: ${error.broker}`,
          contextError: error,
          meta: {},
        });

      case error instanceof KafkaJSRequestTimeoutError:
        throw new MessageBrokerTimeoutException({
          message: `Request timed out for kafka broker: ${error.broker}`,
          contextError: error,
          meta: {},
        });

      default:
        throw new MessageBrokerUnknownException({
          message: `An Unknown error occured while executing kafka operation`,
          contextError: error as Error,
          meta: {},
        });
    }
  }
}
