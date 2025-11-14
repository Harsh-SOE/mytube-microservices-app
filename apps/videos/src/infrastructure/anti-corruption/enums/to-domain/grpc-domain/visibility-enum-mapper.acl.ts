import { VideoGrpcVisibilityStatus } from '@app/contracts/videos';

import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

const GrpcToDomainVisibilityEnumMapper = new Map<
  VideoGrpcVisibilityStatus,
  VideoDomainVisibiltyStatus
>();

GrpcToDomainVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_PRIVATE,
  VideoDomainVisibiltyStatus.PRIVATE,
);
GrpcToDomainVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_PUBLIC,
  VideoDomainVisibiltyStatus.PUBLIC,
);
GrpcToDomainVisibilityEnumMapper.set(
  VideoGrpcVisibilityStatus.GRPC_UNLISTED,
  VideoDomainVisibiltyStatus.UNLISTED,
);

export { GrpcToDomainVisibilityEnumMapper };
