import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserNotificationStatusChangedResponse } from '@app/contracts/users';

import {
  USER_COMMAND_REROSITORY,
  UserCommandRepositoryPort,
} from '@users/application/ports/repository';

import { ChangeNotificationCommand } from './change-notification-status.command';

@CommandHandler(ChangeNotificationCommand)
export class ChangeNotificationCommandHandler
  implements ICommandHandler<ChangeNotificationCommand>
{
  constructor(
    @Inject(USER_COMMAND_REROSITORY)
    private readonly userRepository: UserCommandRepositoryPort,
  ) {}

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
