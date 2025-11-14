import { VideoDomainPublishStatus } from '@videos/domain/enums';

import { VideoPersistancePublishStatus } from '@peristance/videos';

const DomainToPersistancePublishEnumMapper = new Map<
  VideoDomainPublishStatus,
  VideoPersistancePublishStatus
>();

DomainToPersistancePublishEnumMapper.set(
  VideoDomainPublishStatus.PENDING,
  VideoPersistancePublishStatus.PENDING,
);

DomainToPersistancePublishEnumMapper.set(
  VideoDomainPublishStatus.PROCESSING,
  VideoPersistancePublishStatus.PROCESSING,
);

DomainToPersistancePublishEnumMapper.set(
  VideoDomainPublishStatus.PROCESSED,
  VideoPersistancePublishStatus.PROCESSED,
);

DomainToPersistancePublishEnumMapper.set(
  VideoDomainPublishStatus.PUBLISHED,
  VideoPersistancePublishStatus.PUBLISHED,
);

DomainToPersistancePublishEnumMapper.set(
  VideoDomainPublishStatus.FAILED,
  VideoPersistancePublishStatus.FAILED,
);

export { DomainToPersistancePublishEnumMapper };
