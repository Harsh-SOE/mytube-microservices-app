import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserPreferredThemeChangedResponse } from '@app/contracts/users';

import { GrpcToDomainThemeEnumMapper } from '@users/infrastructure/anti-corruption';
import {
  USER_COMMAND_REROSITORY,
  UserCommandRepositoryPort,
} from '@users/application/ports';

import { ChangeThemeCommand } from './change-theme.command';

@CommandHandler(ChangeThemeCommand)
export class ChangeThemeCommandHandler
  implements ICommandHandler<ChangeThemeCommand>
{
  constructor(
    @Inject(USER_COMMAND_REROSITORY)
    private readonly userRepository: UserCommandRepositoryPort,
  ) {}

  async execute({
    userChangePreferredThemeDto,
  }: ChangeThemeCommand): Promise<UserPreferredThemeChangedResponse> {
    // extract the inputs...
    const { id, themePerference } = userChangePreferredThemeDto;

    // load the aggregate...
    const userAggregate = await this.userRepository.loadOneAggregateById(id);

    // convert the dto's theme preference to domain's theme preference type...
    const domainThemePreference =
      GrpcToDomainThemeEnumMapper.get(themePerference);

    if (!domainThemePreference) {
      throw new Error(`Invalid option for theme`);
    }

    // enfoce business rules here...
    userAggregate.changeUserPreferredTheme(domainThemePreference);

    // persist the aggregate...
    await this.userRepository.updateOneById(id, userAggregate);

    return {
      response: 'Theme was changed successfully',
      theme: userAggregate.getUserSnapshot().themePreference,
    };
  }
}
