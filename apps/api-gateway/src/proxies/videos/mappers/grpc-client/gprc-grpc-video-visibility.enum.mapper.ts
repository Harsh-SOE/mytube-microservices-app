import { VideoGrpcVisibilityStatus } from '@app/contracts/videos';

import { VideoRequestVisibilityStatus } from '../../enums';

const GrpcClientVideoVisibilityEnumMapper = new Map<
  VideoGrpcVisibilityStatus,
  VideoRequestVisibilityStatus
>();

GrpcClientVideoVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_PRIVATE,
  VideoRequestVisibilityStatus.PRIVATE,
);
GrpcClientVideoVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_PUBLIC,
  VideoRequestVisibilityStatus.PUBLIC,
);
GrpcClientVideoVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_UNLISTED,
  VideoRequestVisibilityStatus.UNLISTED,
);

export { GrpcClientVideoVisibilityEnumMapper };
