import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PhoneNumberVerfiedEvent } from './phone-number-verified.event';

@EventsHandler(PhoneNumberVerfiedEvent)
export class PhoneNumberVerfiedEventHandler
  implements IEventHandler<PhoneNumberVerfiedEvent>
{
  handle({ phoneNumberVerfiedEventDto }: PhoneNumberVerfiedEvent) {
    const { id, phoneNumber } = phoneNumberVerfiedEventDto;
    console.log(
      `Phone number: ${phoneNumber} for verified for user with id:${id}.`,
    );
  }
}
