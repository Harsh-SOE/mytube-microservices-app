import { UserGrpcThemePreferences } from '@app/contracts/users';

import { DomainThemePreference } from '@users/domain/enums';

const GrpcToDomainThemeEnumMapper = new Map<
  UserGrpcThemePreferences,
  DomainThemePreference
>();

GrpcToDomainThemeEnumMapper.set(
  UserGrpcThemePreferences.SYSTEM,
  DomainThemePreference.SYSTEM,
);

GrpcToDomainThemeEnumMapper.set(
  UserGrpcThemePreferences.LIGHT,
  DomainThemePreference.LIGHT,
);

GrpcToDomainThemeEnumMapper.set(
  UserGrpcThemePreferences.DARK,
  DomainThemePreference.DARK,
);

export { GrpcToDomainThemeEnumMapper };
