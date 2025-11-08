import { GrpcTransportVisibilityStatus } from '@app/contracts/videos';

import { VideoPersistanceVisibilityStatus } from '@peristance/videos';

const VisibilityPersistanceToGrpcEnumMapper = new Map<
  VideoPersistanceVisibilityStatus,
  GrpcTransportVisibilityStatus
>();

VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.PRIVATE,
  GrpcTransportVisibilityStatus.GRPC_PRIVATE,
);
VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.PUBLIC,
  GrpcTransportVisibilityStatus.GRPC_PUBLIC,
);
VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.UNLISTED,
  GrpcTransportVisibilityStatus.GRPC_UNLISTED,
);

export { VisibilityPersistanceToGrpcEnumMapper };
