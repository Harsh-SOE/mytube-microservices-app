import { VideoTransportVisibilityStatus } from '@app/contracts/videos';

import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

const TransportToDomainVisibilityEnumMapper = new Map<
  VideoTransportVisibilityStatus,
  VideoDomainVisibiltyStatus
>();

TransportToDomainVisibilityEnumMapper.set(
  VideoTransportVisibilityStatus.TRANSPORT_PRIVATE,
  VideoDomainVisibiltyStatus.PRIVATE,
);
TransportToDomainVisibilityEnumMapper.set(
  VideoTransportVisibilityStatus.TRANSPORT_PUBLIC,
  VideoDomainVisibiltyStatus.PUBLIC,
);
TransportToDomainVisibilityEnumMapper.set(
  VideoTransportVisibilityStatus.TRANSPORT_UNLISTED,
  VideoDomainVisibiltyStatus.UNLISTED,
);

export { TransportToDomainVisibilityEnumMapper };
