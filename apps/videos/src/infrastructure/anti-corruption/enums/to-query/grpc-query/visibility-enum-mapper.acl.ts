import { VideoGrpcVisibilityStatus } from '@app/contracts/videos';

import { VideoQueryVisibiltyStatus } from '@videos/query';

const GrpcToQueryVisibilityEnumMapper = new Map<
  VideoGrpcVisibilityStatus,
  VideoQueryVisibiltyStatus
>();

GrpcToQueryVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_PRIVATE,
  VideoQueryVisibiltyStatus.PRIVATE,
);
GrpcToQueryVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_PUBLIC,
  VideoQueryVisibiltyStatus.PUBLIC,
);
GrpcToQueryVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_UNLISTED,
  VideoQueryVisibiltyStatus.UNLISTED,
);

export { GrpcToQueryVisibilityEnumMapper };
