import { VideoGrpcVisibilityStatus } from '@app/contracts/videos';

import { VideoPersistanceVisibilityStatus } from '@peristance/videos';

const GrpcToPersistanceVisibilityEnumMapper = new Map<
  VideoGrpcVisibilityStatus,
  VideoPersistanceVisibilityStatus
>();

GrpcToPersistanceVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_PRIVATE,
  VideoPersistanceVisibilityStatus.PRIVATE,
);
GrpcToPersistanceVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_PUBLIC,
  VideoPersistanceVisibilityStatus.PUBLIC,
);
GrpcToPersistanceVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_UNLISTED,
  VideoPersistanceVisibilityStatus.UNLISTED,
);

export { GrpcToPersistanceVisibilityEnumMapper };
