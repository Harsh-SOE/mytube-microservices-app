import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { CLIENT_PROVIDER, EMAIL_CLIENT, WATCH_CLIENT } from '@app/clients';

import { User } from '@peristance/user';

import { SendEmailMessage } from './types';

@Injectable()
export class MessageBrokerService implements OnModuleInit, OnModuleDestroy {
  /**
   * Service responsible for interacting with Kafka message brokers for email and watch-related events.
   *
   * The `MessageBrokerService` manages connections to two Kafka clients: one for handling email-related
   * messages and another for watch-related messages. It provides methods to emit events when a user is created,
   * such as sending an email notification and saving the user in the watch service.
   *
   * @remarks
   * - Implements `OnModuleInit` and `OnModuleDestroy` to manage broker connections during the NestJS module lifecycle.
   * - Uses dependency injection to obtain Kafka clients for email and watch services.
   *
   * @example
   * ```typescript
   * messageBrokerService.userCreatedSendEmail(emailPayload);
   * messageBrokerService.userCreatedSaveInWatchService(user);
   * ```
   */
  constructor(
    @Inject(CLIENT_PROVIDER.EMAIL) private readonly emailBroker: ClientKafka,
    @Inject(CLIENT_PROVIDER.WATCH) private readonly watchBroker: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.emailBroker.connect();
    await this.watchBroker.connect();
  }

  async onModuleDestroy() {
    await this.emailBroker.close();
    await this.watchBroker.close();
  }

  /**
   * Emits a message to the email broker to send an email when a user is created.
   *
   * @param payload - The email message payload containing details required to send the email.
   */
  userCreatedSendEmail(payload: SendEmailMessage) {
    this.emailBroker.emit(EMAIL_CLIENT.USER_CREATED, payload);
  }

  /**
   * Emits a user creation event to the watch service via the message broker.
   *
   * @param payload - The user entity containing information about the newly created user.
   */
  userCreatedSaveInWatchService(
    payload: Omit<User, 'createdAt' | 'updatedAt'>,
  ) {
    this.watchBroker.emit(WATCH_CLIENT.USER_CREATED, payload);
  }
}
