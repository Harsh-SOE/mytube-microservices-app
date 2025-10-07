import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeThemeCommand } from './change-theme.command';
import { UserPreferredThemeChangedResponse } from '@app/contracts/users';
import { UserCommandRepository } from '@users/infrastructure/repository';
import { GrpcToDomainThemeEnumMapper } from '@users/infrastructure/anti-corruption';

@CommandHandler(ChangeThemeCommand)
export class ChangeThemeCommandHandler
  implements ICommandHandler<ChangeThemeCommand>
{
  constructor(private readonly userRepository: UserCommandRepository) {}

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
