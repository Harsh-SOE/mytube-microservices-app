import { VideoTransportVisibilityStatus } from '@app/contracts/videos';
import { VideoPersistanceVisibilityStatus } from '@peristance/videos';

const VisibilityPersistanceToGrpcEnumMapper = new Map<
  VideoPersistanceVisibilityStatus,
  VideoTransportVisibilityStatus
>();

VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.PRIVATE,
  VideoTransportVisibilityStatus.TRANSPORT_PRIVATE,
);
VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.PUBLIC,
  VideoTransportVisibilityStatus.TRANSPORT_PUBLIC,
);
VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.UNLISTED,
  VideoTransportVisibilityStatus.TRANSPORT_UNLISTED,
);

export { VisibilityPersistanceToGrpcEnumMapper };
