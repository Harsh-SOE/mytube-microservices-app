import { DomainThemePreference } from '@users/domain/enums';

export class ChangeThemeEvent {
  public constructor(
    public readonly changeThemeEventDto: {
      id: string;
      theme: DomainThemePreference;
    },
  ) {}
}
