import { VideoDomainPublishStatus } from '@videos/domain/enums';

import { VideoPersistancePublishStatus } from '@peristance/videos';

const PersistanceToDomainPublishEnumMapper = new Map<
  VideoPersistancePublishStatus,
  VideoDomainPublishStatus
>();

PersistanceToDomainPublishEnumMapper.set(
  VideoPersistancePublishStatus.PENDING,
  VideoDomainPublishStatus.PENDING,
);
PersistanceToDomainPublishEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSING,
  VideoDomainPublishStatus.PROCESSING,
);
PersistanceToDomainPublishEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSED,
  VideoDomainPublishStatus.PROCESSED,
);
PersistanceToDomainPublishEnumMapper.set(
  VideoPersistancePublishStatus.PUBLISHED,
  VideoDomainPublishStatus.PUBLISHED,
);
PersistanceToDomainPublishEnumMapper.set(
  VideoPersistancePublishStatus.FAILED,
  VideoDomainPublishStatus.FAILED,
);

export { PersistanceToDomainPublishEnumMapper };
