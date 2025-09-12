import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedDomainEvent } from './user-created.domain-event';
import { MessageBrokerService } from '@users/infrastructure/message-broker/message-broker.service';
import { EMAIL_CLIENT } from '@app/clients';

@EventsHandler(UserCreatedDomainEvent)
export class UserCreatedDomainEventHandler
  implements IEventHandler<UserCreatedDomainEvent>
{
  constructor(private readonly messageBroker: MessageBrokerService<any>) {}

  handle({ user }: UserCreatedDomainEvent) {
    const userPayloadData = user.getSnapshot();
    this.messageBroker.sendEmail(EMAIL_CLIENT.USER_CREATED, userPayloadData);
  }
}
