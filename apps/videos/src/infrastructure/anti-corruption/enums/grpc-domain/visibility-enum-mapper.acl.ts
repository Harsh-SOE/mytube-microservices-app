import { GrpcTransportVisibilityStatus } from '@app/contracts/videos';

import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

const GrpcToDomainVisibilityEnumMapper = new Map<
  GrpcTransportVisibilityStatus,
  VideoDomainVisibiltyStatus
>();

GrpcToDomainVisibilityEnumMapper.set(
  GrpcTransportVisibilityStatus.GRPC_PRIVATE,
  VideoDomainVisibiltyStatus.PRIVATE,
);
GrpcToDomainVisibilityEnumMapper.set(
  GrpcTransportVisibilityStatus.GRPC_PUBLIC,
  VideoDomainVisibiltyStatus.PUBLIC,
);
GrpcToDomainVisibilityEnumMapper.set(
  GrpcTransportVisibilityStatus.GRPC_UNLISTED,
  VideoDomainVisibiltyStatus.UNLISTED,
);

export { GrpcToDomainVisibilityEnumMapper };
