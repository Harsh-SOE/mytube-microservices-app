import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { UserPreferredLanguageChangedResponse } from '@app/contracts/users';

import {
  USER_COMMAND_REROSITORY,
  UserCommandRepositoryPort,
} from '@users/application/ports/repository';

import { ChangeLanguageCommand } from './change-language.command';

@CommandHandler(ChangeLanguageCommand)
export class ChangeLanguageCommandHandler
  implements ICommandHandler<ChangeLanguageCommand>
{
  constructor(
    @Inject(USER_COMMAND_REROSITORY)
    private readonly userRepository: UserCommandRepositoryPort,
    private eventPublisher: EventPublisher,
  ) {}

  async execute({
    userChangePreferredLanguageDto,
  }: ChangeLanguageCommand): Promise<UserPreferredLanguageChangedResponse> {
    // extract the inputs...
    const { id, language } = userChangePreferredLanguageDto;

    // load the aggregate...
    const userAggregate = this.eventPublisher.mergeObjectContext(
      await this.userRepository.loadOneAggregateById(id),
    );

    // apply the business rules here, the rules are abstracted by the domain layer...
    userAggregate.changeUserPreferredlanguage(language);

    // persist aggregate here...
    await this.userRepository.updateOneById(id, userAggregate);

    // commit all uncomitted events...
    userAggregate.commit();

    // Optionally, return the updated aggregate id or DTO for UI
    return {
      response: 'Language changed successfully',
      language: userAggregate.getUserSnapshot().languagePreference,
    };
  }
}
