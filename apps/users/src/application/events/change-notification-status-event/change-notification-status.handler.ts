import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChangeNotificationStatusEvent } from './change-notification-status.event';

@EventsHandler(ChangeNotificationStatusEvent)
export class ChangeNotificationStatusEventHandler
  implements IEventHandler<ChangeNotificationStatusEvent>
{
  handle({ notificationStatusChangedEventDto }: ChangeNotificationStatusEvent) {
    const { id, status } = notificationStatusChangedEventDto;
    console.log(
      `User with id:${id} turned ${status ? 'on' : 'off'} its notification status`,
    );
  }
}
