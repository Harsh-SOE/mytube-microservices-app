import { UserGrpcThemePreferences } from '@app/contracts/users';

import { DomainThemePreference } from '@users/domain/enums';

const DomainToGrpcThemeEnumMapper = new Map<
  DomainThemePreference,
  UserGrpcThemePreferences
>();

DomainToGrpcThemeEnumMapper.set(
  DomainThemePreference.SYSTEM,
  UserGrpcThemePreferences.SYSTEM,
);

DomainToGrpcThemeEnumMapper.set(
  DomainThemePreference.LIGHT,
  UserGrpcThemePreferences.LIGHT,
);

DomainToGrpcThemeEnumMapper.set(
  DomainThemePreference.DARK,
  UserGrpcThemePreferences.DARK,
);

export { DomainToGrpcThemeEnumMapper };
