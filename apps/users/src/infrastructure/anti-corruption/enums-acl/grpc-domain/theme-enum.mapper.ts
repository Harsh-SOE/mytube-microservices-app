import { UserTransportThemePreferences } from '@app/contracts/users';

import { DomainThemePreference } from '@users/domain/enums';

const GrpcToDomainThemeEnumMapper = new Map<
  UserTransportThemePreferences,
  DomainThemePreference
>();

GrpcToDomainThemeEnumMapper.set(
  UserTransportThemePreferences.SYSTEM,
  DomainThemePreference.SYSTEM,
);

GrpcToDomainThemeEnumMapper.set(
  UserTransportThemePreferences.LIGHT,
  DomainThemePreference.LIGHT,
);

GrpcToDomainThemeEnumMapper.set(
  UserTransportThemePreferences.DARK,
  DomainThemePreference.DARK,
);

export { GrpcToDomainThemeEnumMapper };
