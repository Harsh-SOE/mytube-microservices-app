import { VideoGrpcVisibilityStatus } from '@app/contracts/videos';

import { VideoPersistanceVisibilityStatus } from '@peristance/videos';

const VisibilityPersistanceToGrpcEnumMapper = new Map<
  VideoPersistanceVisibilityStatus,
  VideoGrpcVisibilityStatus
>();

VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.PRIVATE,
  VideoGrpcVisibilityStatus.GRPC_PRIVATE,
);
VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.PUBLIC,
  VideoGrpcVisibilityStatus.GRPC_PUBLIC,
);
VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.UNLISTED,
  VideoGrpcVisibilityStatus.GRPC_UNLISTED,
);

export { VisibilityPersistanceToGrpcEnumMapper };
