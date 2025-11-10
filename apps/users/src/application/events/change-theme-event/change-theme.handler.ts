import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChangeThemeEvent } from './change-theme.event';

@EventsHandler(ChangeThemeEvent)
export class ChangeThemeEventHandler
  implements IEventHandler<ChangeThemeEvent>
{
  handle({ changeThemeEventDto }: ChangeThemeEvent) {
    const { id, theme } = changeThemeEventDto;

    console.log(`User with id:${id} chaanged its theme to ${theme}`);
  }
}
