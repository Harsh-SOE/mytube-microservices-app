import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OnBoardingCompletedEvent } from './onboarding-completed.event';

@EventsHandler(OnBoardingCompletedEvent)
export class OnBoardingCompletedEventHandler
  implements IEventHandler<OnBoardingCompletedEvent>
{
  handle({
    onBoardingCompletedEvent: phoneNumberVerfiedEventDto,
  }: OnBoardingCompletedEvent) {
    const { id } = phoneNumberVerfiedEventDto;
    console.log(`User with id:${id} onboarded successfully`);
  }
}
