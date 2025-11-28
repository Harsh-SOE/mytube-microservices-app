import { VideoTransportPublishStatus } from '@app/contracts/videos';

import { VideoDomainPublishStatus } from '@videos/domain/enums';

const DomainToTransportPublishEnumMapper = new Map<
  VideoDomainPublishStatus,
  VideoTransportPublishStatus
>();

DomainToTransportPublishEnumMapper.set(
  VideoDomainPublishStatus.PENDING,
  VideoTransportPublishStatus.TRANSPORT_PENDING,
);

DomainToTransportPublishEnumMapper.set(
  VideoDomainPublishStatus.PROCESSING,
  VideoTransportPublishStatus.TRANSPORT_PROCESSING,
);

DomainToTransportPublishEnumMapper.set(
  VideoDomainPublishStatus.PROCESSED,
  VideoTransportPublishStatus.TRANSPORT_PROCESSED,
);

DomainToTransportPublishEnumMapper.set(
  VideoDomainPublishStatus.PUBLISHED,
  VideoTransportPublishStatus.TRANSPORT_PUBLISHED,
);

DomainToTransportPublishEnumMapper.set(
  VideoDomainPublishStatus.FAILED,
  VideoTransportPublishStatus.TRANSPORT_FAILED,
);

export { DomainToTransportPublishEnumMapper };
