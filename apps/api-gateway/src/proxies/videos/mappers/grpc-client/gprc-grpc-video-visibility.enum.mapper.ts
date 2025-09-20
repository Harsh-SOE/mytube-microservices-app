import { VideoTransportVisibilityStatus } from '@app/contracts/videos';
import { VideoRequestVisibilityStatus } from '../../enums';

const GrpcClientVideoVisibilityEnumMapper = new Map<
  VideoTransportVisibilityStatus,
  VideoRequestVisibilityStatus
>();

GrpcClientVideoVisibilityEnumMapper.set(
  VideoTransportVisibilityStatus.TRANSPORT_PRIVATE,
  VideoRequestVisibilityStatus.PRIVATE,
);
GrpcClientVideoVisibilityEnumMapper.set(
  VideoTransportVisibilityStatus.TRANSPORT_PUBLIC,
  VideoRequestVisibilityStatus.PUBLIC,
);
GrpcClientVideoVisibilityEnumMapper.set(
  VideoTransportVisibilityStatus.TRANSPORT_UNLISTED,
  VideoRequestVisibilityStatus.UNLISTED,
);

export { GrpcClientVideoVisibilityEnumMapper };
