import { UserTransportThemePreferences } from '@app/contracts/users';
import { DomainThemePreference } from '@users/domain/enums';

const DomainToGrpcThemeEnumMapper = new Map<
  DomainThemePreference,
  UserTransportThemePreferences
>();

DomainToGrpcThemeEnumMapper.set(
  DomainThemePreference.SYSTEM,
  UserTransportThemePreferences.SYSTEM,
);

DomainToGrpcThemeEnumMapper.set(
  DomainThemePreference.LIGHT,
  UserTransportThemePreferences.LIGHT,
);

DomainToGrpcThemeEnumMapper.set(
  DomainThemePreference.DARK,
  UserTransportThemePreferences.DARK,
);

export { DomainToGrpcThemeEnumMapper };
