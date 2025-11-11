import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import {
  LOGGER_PORT,
  LoggerPort,
  MESSAGE_BROKER,
  MessageBrokerPort,
} from '@users/application/ports';
import { UserAggregatePersistanceACL } from '@users/infrastructure/anti-corruption';

import { CreateProfileEvent } from './create-profile.event';

@EventsHandler(CreateProfileEvent)
export class CompleteProfileEventHandler
  implements IEventHandler<CreateProfileEvent>
{
  constructor(
    private readonly aggregatePersistanceACL: UserAggregatePersistanceACL,
    @Inject(MESSAGE_BROKER) private readonly messageBroker: MessageBrokerPort,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {}

  async handle({ user }: CreateProfileEvent) {
    const userPayload = user.getUserSnapshot();
    const { id, handle, email } = userPayload;

    const sendMailPayload = {
      email,
      handle,
      id,
    };

    await this.messageBroker.publishMessage(
      'user.created',
      JSON.stringify(sendMailPayload),
    );

    this.logger.info(
      `User with email:${email}, created a profile: ${JSON.stringify(user)}`,
    );
  }
}
