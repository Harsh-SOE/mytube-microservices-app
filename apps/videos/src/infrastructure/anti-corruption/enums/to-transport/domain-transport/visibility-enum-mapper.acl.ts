import { VideoTransportVisibilityStatus } from '@app/contracts/videos';

import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

const DomainToTransportVisibilityEnumMapper = new Map<
  VideoDomainVisibiltyStatus,
  VideoTransportVisibilityStatus
>();

DomainToTransportVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.PRIVATE,
  VideoTransportVisibilityStatus.TRANSPORT_PRIVATE,
);
DomainToTransportVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.PUBLIC,
  VideoTransportVisibilityStatus.TRANSPORT_PUBLIC,
);
DomainToTransportVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.UNLISTED,
  VideoTransportVisibilityStatus.TRANSPORT_UNLISTED,
);

export { DomainToTransportVisibilityEnumMapper };
