import { VideoTransportVisibilityStatus } from '@app/contracts/videos';
import { VideoRequestVisibilityStatus } from '../../enums';

const ClientGrpcVideoVisibilityEnumMapper = new Map<
  VideoRequestVisibilityStatus,
  VideoTransportVisibilityStatus
>();

ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.PRIVATE,
  VideoTransportVisibilityStatus.TRANSPORT_PRIVATE,
);
ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.PUBLIC,
  VideoTransportVisibilityStatus.TRANSPORT_PUBLIC,
);
ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.UNLISTED,
  VideoTransportVisibilityStatus.TRANSPORT_UNLISTED,
);

export { ClientGrpcVideoVisibilityEnumMapper };
