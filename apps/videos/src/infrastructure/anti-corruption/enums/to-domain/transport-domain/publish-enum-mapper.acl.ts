import { VideoTransportPublishStatus } from '@app/contracts/videos';

import { VideoDomainPublishStatus } from '@videos/domain/enums';

const TransportToDomainPublishEnumMapper = new Map<
  VideoTransportPublishStatus,
  VideoDomainPublishStatus
>();

TransportToDomainPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_PENDING,
  VideoDomainPublishStatus.PENDING,
);

TransportToDomainPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_PROCESSING,
  VideoDomainPublishStatus.PROCESSING,
);

TransportToDomainPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_PROCESSED,
  VideoDomainPublishStatus.PROCESSED,
);

TransportToDomainPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_PUBLISHED,
  VideoDomainPublishStatus.PUBLISHED,
);

TransportToDomainPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_FAILED,
  VideoDomainPublishStatus.FAILED,
);

export { TransportToDomainPublishEnumMapper };
