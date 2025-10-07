import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateProfileEvent } from './create-profile.event';
import { MessageBrokerService } from '@users/infrastructure/message-broker/message-broker.service';
import { UserAggregatePersistanceACL } from '@users/infrastructure/anti-corruption';

@EventsHandler(CreateProfileEvent)
export class CompleteProfileEventHandler
  implements IEventHandler<CreateProfileEvent>
{
  constructor(
    private readonly messageBroker: MessageBrokerService,
    private readonly aggregatePersistanceACL: UserAggregatePersistanceACL,
  ) {}

  handle({ user }: CreateProfileEvent) {
    const userPayload = user.getUserSnapshot();
    const { id, handle, email } = userPayload;

    this.messageBroker.userCreatedSendEmail({ email, handle, id });
    this.messageBroker.userCreatedSaveInWatchService(
      this.aggregatePersistanceACL.toPersistance(user),
    );

    console.log(
      `User with email:${email}, created a profile: ${JSON.stringify(user)}`,
    );
  }
}
