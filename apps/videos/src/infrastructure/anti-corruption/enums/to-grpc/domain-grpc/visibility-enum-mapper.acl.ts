import { VideoGrpcVisibilityStatus } from '@app/contracts/videos';

import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

const DomainToGrpcVisibilityEnumMapper = new Map<
  VideoDomainVisibiltyStatus,
  VideoGrpcVisibilityStatus
>();

DomainToGrpcVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.PRIVATE,
  VideoGrpcVisibilityStatus.GRPC_PRIVATE,
);
DomainToGrpcVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.PUBLIC,
  VideoGrpcVisibilityStatus.GRPC_PUBLIC,
);
DomainToGrpcVisibilityEnumMapper.set(
  VideoDomainVisibiltyStatus.UNLISTED,
  VideoGrpcVisibilityStatus.GRPC_UNLISTED,
);

export { DomainToGrpcVisibilityEnumMapper };
