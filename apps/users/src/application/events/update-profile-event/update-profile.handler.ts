import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateProfileEvent } from './update-profile.event';

@EventsHandler(UpdateProfileEvent)
export class UpdateProfileEventHandler
  implements IEventHandler<UpdateProfileEvent>
{
  handle({ userUpdateProfileDto }: UpdateProfileEvent) {
    const { updatedProfile } = userUpdateProfileDto;
    const { id } = updatedProfile;
    console.log(
      `User with id:${id}, updated its profile to: ${JSON.stringify(updatedProfile)}`,
    );
  }
}
