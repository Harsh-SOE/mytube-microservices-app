import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

import { VideoPersistanceVisibilityStatus } from '@peristance/videos';

const PersistanceToDomainVisibilityEnumMapper = new Map<
  VideoPersistanceVisibilityStatus,
  VideoDomainVisibiltyStatus
>();

PersistanceToDomainVisibilityEnumMapper.set(
  VideoPersistanceVisibilityStatus.PRIVATE,
  VideoDomainVisibiltyStatus.PRIVATE,
);
PersistanceToDomainVisibilityEnumMapper.set(
  VideoPersistanceVisibilityStatus.PUBLIC,
  VideoDomainVisibiltyStatus.PUBLIC,
);
PersistanceToDomainVisibilityEnumMapper.set(
  VideoPersistanceVisibilityStatus.UNLISTED,
  VideoDomainVisibiltyStatus.UNLISTED,
);

export { PersistanceToDomainVisibilityEnumMapper };
