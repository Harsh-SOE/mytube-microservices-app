import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeNotificationCommand } from './change-notification-status.command';
import { UserNotificationStatusChangedResponse } from '@app/contracts/users';
import { UserCommandRepository } from '@users/infrastructure/repository';

@CommandHandler(ChangeNotificationCommand)
export class ChangeNotificationCommandHandler
  implements ICommandHandler<ChangeNotificationCommand>
{
  constructor(private readonly userRepository: UserCommandRepository) {}

  async execute({
    userChangeNotificationStatusDto,
  }: ChangeNotificationCommand): Promise<UserNotificationStatusChangedResponse> {
    // extract the inputs...
    const { id, notificationStatus } = userChangeNotificationStatusDto;

    // load the aggregate here...
    const userAggregate = await this.userRepository.loadOneAggregateById(id);

    // enforce business rule by using the domain only...
    userAggregate.changeUserNotificationPreference(notificationStatus);

    // persist the aggregate...
    await this.userRepository.updateOneById(id, userAggregate);

    return {
      response: 'notification status changed successfully',
      status: userAggregate.getUserSnapshot().notification,
    };
  }
}
