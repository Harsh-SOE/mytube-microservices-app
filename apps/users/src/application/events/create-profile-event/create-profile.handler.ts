import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserAggregatePersistanceACL } from '@users/infrastructure/anti-corruption';
import { SendEmailMessage } from '@users/infrastructure/message-broker';
import { MESSAGE_BROKER } from '@users/application/ports/message-broker';

import { MessageBrokerPort } from '@hub/application/ports';

import { CreateProfileEvent } from './create-profile.event';

@EventsHandler(CreateProfileEvent)
export class CompleteProfileEventHandler
  implements IEventHandler<CreateProfileEvent>
{
  constructor(
    private readonly aggregatePersistanceACL: UserAggregatePersistanceACL,
    @Inject(MESSAGE_BROKER) private readonly messageBroker: MessageBrokerPort,
  ) {}

  handle({ user }: CreateProfileEvent) {
    const userPayload = user.getUserSnapshot();
    const { id, handle, email } = userPayload;

    this.messageBroker.publishMessage<SendEmailMessage>('user.created', {
      email,
      handle,
      id,
    });

    console.log(
      `User with email:${email}, created a profile: ${JSON.stringify(user)}`,
    );
  }
}
