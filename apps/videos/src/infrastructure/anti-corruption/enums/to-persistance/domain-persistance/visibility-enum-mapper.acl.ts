import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

import { VideoPersistanceVisibilityStatus } from '@peristance/videos';

const DomainToPersistanceVisibilityEnumMapper = new Map<
  VideoDomainVisibiltyStatus,
  VideoPersistanceVisibilityStatus
>();

DomainToPersistanceVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.PRIVATE,
  VideoPersistanceVisibilityStatus.PRIVATE,
);
DomainToPersistanceVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.PUBLIC,
  VideoPersistanceVisibilityStatus.PUBLIC,
);
DomainToPersistanceVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.UNLISTED,
  VideoPersistanceVisibilityStatus.UNLISTED,
);

export { DomainToPersistanceVisibilityEnumMapper };
