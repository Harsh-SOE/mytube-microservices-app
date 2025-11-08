import { GrpcTransportVisibilityStatus } from '@app/contracts/videos';

import { VideoPersistanceVisibilityStatus } from '@peristance/videos';

const GrpcToPersistanceVisibilityEnumMapper = new Map<
  GrpcTransportVisibilityStatus,
  VideoPersistanceVisibilityStatus
>();

GrpcToPersistanceVisibilityEnumMapper.set(
  GrpcTransportVisibilityStatus.GRPC_PRIVATE,
  VideoPersistanceVisibilityStatus.PRIVATE,
);
GrpcToPersistanceVisibilityEnumMapper.set(
  GrpcTransportVisibilityStatus.GRPC_PUBLIC,
  VideoPersistanceVisibilityStatus.PUBLIC,
);
GrpcToPersistanceVisibilityEnumMapper.set(
  GrpcTransportVisibilityStatus.GRPC_UNLISTED,
  VideoPersistanceVisibilityStatus.UNLISTED,
);

export { GrpcToPersistanceVisibilityEnumMapper };
