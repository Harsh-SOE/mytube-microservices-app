import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangeLanguageEvent } from './change-language.event';

@EventsHandler(ChangeLanguageEvent)
export class ChangeLanguageEventHandler
  implements IEventHandler<ChangeLanguageEvent>
{
  public constructor() {}

  public handle({ langaugeChangedEventDto }: ChangeLanguageEvent) {
    const { id, langauge } = langaugeChangedEventDto;

    console.log(`User with id:${id} changed its language to '${langauge}'`);
  }
}
